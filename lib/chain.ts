export const chainUrl = (chainId: string) => {
  const infuraKey = process.env.INFURA_PROJECT_ID
  switch(Number.parseInt(chainId)) {
    case 1:
      return `https://mainnet.infura.io/v3/${infuraKey}`
    case 3:
      return `https://ropsten.infura.io/v3/${infuraKey}`
    case 4:
      return `https://rinkeby.infura.io/v3/${infuraKey}`
    case 5:
      return `https://goerli.infura.io/v3/${infuraKey}`
    case 137:
      return `https://polygon-mainnet.infura.io/v3/${infuraKey}`
    default:
      return `https://rinkeby.infura.io/v3/${infuraKey}`
  }
}