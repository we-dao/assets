const Web3 = require("web3");
const { MultiCall } = require("eth-multicall");
const ERC20 = require("../data/abis/ERC20.json");

/**
 * Multicall contracts methods
 * @description
 *    Only works with view methods, function will return json array of contracts passed as first
 *    parameter with a extra prop with the results of method called
 * @param {string} rpc provider jsonrpc url
 * @param {array} contracts
 * @param {array} methods methods to call
 * @param {json} ABI Aplication Binary Interface
 * @returns {array} json array with method view called
 */
export const multicall = async (
  rpc,
  multicallAddress,
  contracts,
  methods = ["balanceOf"],
  ABI = ERC20
) => {
  const web3 = new Web3(rpc);
  const multicall = new MultiCall(web3, multicallAddress);

  const calls = contracts.map((c) => {
    const contract = new web3.eth.Contract(ABI, c.address);
    const call = {};
    for (const method of methods) {
      call[method] = contract.methods[method]();
    }
    return call;
  });
  const [callResults] = await multicall.all([calls]);
  // @TODO: return all methods
  for (let i = 0; i < contracts.length; i++) {
    contracts[i][method] = callResults[i][method] || 0;
  }
  return contracts;
};
