import axios from 'axios'

class ApiAgent {
  getCoinMarketCap = async () => {
    let market = await axios.get('https://api.coinmarketcap.com/v2/ticker/1765/')
    return market
  }
}

export default new ApiAgent()
