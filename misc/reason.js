// This is universal, works with Infura -- set provider accordingly

const ethers = require('ethers')
// const provider = ethers.getDefaultProvider('rinkeby')
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
// const provider = new ethers.providers.InfuraProvider(network = 'rinkeby')

function hex_to_ascii (str1) {
  var hex = str1.toString()
  var str = ''
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return str
}

async function reason () {
  var args = process.argv.slice(2)
  let hash = args[0]
  console.log('tx hash:', hash)
  // console.log('provider:', process.env.WEB3_URL)

  let tx = await provider.getTransaction(hash)
  console.log('tx', tx)
  if (!tx) {
    console.log('tx not found')
  } else {
    let code = await provider.call(tx, tx.blockNumber)
    console.log('code', code)
    let reason = hex_to_ascii(code.substr(138))
    console.log('revert reason:', reason)
  }
}

reason()
