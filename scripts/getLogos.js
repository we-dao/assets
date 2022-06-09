/**
 * 1 - iterate over assets/chain_id/index.js
 * 2 - get logos from trust-wallet, and persist it in ./storage/<CID>, if not found in trust-wallet, try on same ERC20 ( .logo() ). otherway, skip it.
 * 3 - add CID on asset object
 * 4 - write index.js
 * 7 - continue with iteration
 */

import fs from "fs";
import _ from "lodash";
import * as IPFS from "";
import axios from "axios";
import chains from "./data/chains.cjs";
const CHAIN_ID = Number(process.argv[2]);
const CHAIN = chains[CHAIN_ID];
const ASSETS = `../assets/${CHAIN_ID}/index.json`;

import { Web3Storage, File } from "web3.storage";

//  https://dweb.link/ipfs/YOUR_CID

async function main() {
  const ipfs = await IPFS.create();
  const token = process.env.WEB3_STORAGE_TOKEN;

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }
  const storage = new Web3Storage({ token });

  let files = [];
  for (const asset of ASSETS) {
    let url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${CHAIN.name}/assets/${asset.address}/logo.png`;
    try {
      let res = await axios.get(url, {
        responseType: "arraybuffer",
      });
      console.log(`Uploading logo of ${asset.name}`);
      let file = new File([res.data], `${asset.address}.png`, "image/png");
      files.push(file);
    } catch (error) {
      console.log(
        `No logo for this shit -> ${asset.name} - ${asset.address}.png`
      );
      console.log(error);
    }
    const cid = await storage.put(files);
    console.log(`Content added with CID: https://dweb.link/ipfs/${cid}`);
  }
}

main();
