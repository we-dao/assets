const Web3 = require("web3");
const { MultiCall } = require("eth-multicall");
const chains = require("../data/chains");

const ABI = {
  weRegistry: require("../data/abis/we_registry.json"),
};

const CHAIN_ID = Number(process.argv[2]);

const getTokens = async ({ chainId }) => {
  const CHAIN = chains[chainId || CHAIN_ID];
  const web3 = new Web3(CHAIN.rpcs[0]);
  const multicall = new MultiCall(web3, CHAIN.multicall);

  const weRegistry = new web3.eth.Contract(ABI.weRegistry, CHAIN.weRegistry);

  let tokenLength = await weRegistry.methods.contracts_length().call();
  const weRegistrycalls = {};
  for (let i = 0; i < tokenLength; i++)
    weRegistrycalls[i] = weRegistry.methods.contracts(i);
  const [[weRegistrycallsRes]] = await multicall.all([[weRegistrycalls]]);

  // create array
  let contracts = Object.values(weRegistrycallsRes);
  const calls = contracts.map((c) => {
    const contract = new web3.eth.Contract(ABI.weRegistry, c);
    const call = {};
    call[c] = contract.methods.version();
    return call;
  });
  const [callResults] = await multicall.all([calls]);
  // responses - filter for tokens
  let tokens = callResults.map((c) => {
    if (Object.values(c)[0] && Object.values(c)[0].includes("token "))
      return Object.keys(c)[0];
  });
  tokens = tokens.filter((t) => !!t);
  return tokens;
};

module.exports = {
  getTokens,
};
