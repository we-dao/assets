const fs = require("fs");
const _ = require("lodash");
const axios = require("axios");
const multicall = require("./utils/multicall.cjs");
const chains = require("./data/chains.cjs");
const weRegistryUtils = require("./utils/weRegistry.cjs");
const CHAIN_ID = Number(process.argv[2]);
const CHAIN = chains[CHAIN_ID];
const WHITELIST_PATH = `../assets/${CHAIN_ID}/whitelist.json`;
const WHITELIST = require(WHITELIST_PATH);
const ASSETS_LIST_PATH = `../assets/${CHAIN_ID}/index.json`;
const ASSETS_LIST = require(ASSETS_LIST_PATH);

const getNewList = async () => {
  console.log(`===> Updating ${CHAIN.name} chain (id: ${CHAIN_ID}):`);
  let weTokens = [];
  if (CHAIN.weRegistry)
    weTokens = await weRegistryUtils.getTokens({ chainId: CHAIN_ID }); // @dev add we tokens
  const WHITELIST_CLEAN = [...new Set(WHITELIST)]; // @dev tricky way to remove duplicates
  const NEW_WHITELIST = [...new Set([...WHITELIST_CLEAN, ...weTokens])];
  console.log(
    `==> Updating whitelist:
    total duplicate removed: ${WHITELIST.length - WHITELIST_CLEAN.length}
    total new assets added from weRegistry: ${
      NEW_WHITELIST.length - WHITELIST_CLEAN.length
    }`
  );
  fs.writeFileSync(
    WHITELIST_PATH.replace("../", ""),
    JSON.stringify(NEW_WHITELIST, "", 2)
  );
  let list = _.difference(
    NEW_WHITELIST,
    ASSETS_LIST.map((a) => a.address)
  );

  list = [...new Set([...list])]; // @dev tricky way to remove duplicates
  return list;
};

const main = async () => {
  /**
   * 1 - get diff address from whitelist and assets_list
   * 2 - get basic ERC20 data (name, symbol, decimals)
   * 3 - add metadata (interface, description)
   */

  // trustwallet raw
  // https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/info.json

  // FINAL RESULT per Asset:
  //   {
  //     "name": "Wrapped MATIC",,
  //     "symbol": "WMATIC",
  //     "interface": "ERC20",
  //     "decimals": 18,
  //     "description": "Wrapped MATIC",
  //     "address": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  //     "logo": "bafkreif2jfndor3wvnwpv3gblm7d2d43ar2dzubqt6mvow4fth6acexaga"
  //   }

  // 1 - get diff address from whitelist and assets_list
  let list = await getNewList();

  // 2 - get basic ERC20 data (name, symbol, decimals)
  let multicallRes = await multicall({
    rpc: CHAIN.rpcs[0],
    multicallAddress: CHAIN.multicall,
    contracts: list,
    methods: ["name", "symbol", "decimals"],
  });

  // 3 - refill with metadata (interface, description, and more)
  let allRes = await Promise.allSettled(
    Object.keys(multicallRes).map((a) =>
      axios.get(
        `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${CHAIN.name}/assets/${a}/info.json`
      )
    )
  );
  let metadatas = allRes
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value.data);
  metadatas = _.keyBy(metadatas, "id");

  res = Object.keys(multicallRes).map((a) => {
    return {
      address: a,
      name: multicallRes[a].name,
      symbol: multicallRes[a].symbol,
      interface: "ERC20",
      decimals: Number(multicallRes[a].decimals),
      website: metadatas[a] ? metadatas[a].website : "",
      description: metadatas[a] ? metadatas[a].description : "",
      logo: "",
    };
  });

  let final = [...ASSETS_LIST, ...res];

  fs.writeFileSync(
    ASSETS_LIST_PATH.replace("../", ""),
    JSON.stringify(final, "", 2)
  );
};

main();

/**
 * Update metas
 * 1 - read first (argv[2]) (chain_id)
 * 2 - read governances weRegistry
 * 5 - load meta from each gov, add it on /storage/<CID>
 */
