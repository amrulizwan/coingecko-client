# CoinGecko Client

Professional JavaScript SDK for seamless integration with CoinGecko API. Access comprehensive cryptocurrency market data, prices, charts, and exchange information with built-in error handling and TypeScript-friendly design.

## Features

- 🚀 **Easy Integration** - Simple and intuitive API design
- 📊 **Complete Coverage** - Access to all major CoinGecko endpoints
- 🔒 **Error Handling** - Robust error handling with descriptive messages
- ⚡ **Performance** - Optimized HTTP client with configurable timeouts
- 🎯 **Flexible** - Support for both free and pro API keys
- 📦 **Lightweight** - Minimal dependencies

## Installation

```bash
npm install coingecko-client
```

## Quick Start

```javascript
const CoinGeckoClient = require('coingecko-client');

const client = new CoinGeckoClient();

async function getCryptoPrices() {
  try {
    const prices = await client.getSimplePrice('bitcoin,ethereum', 'usd');
    console.log(prices);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getCryptoPrices();
```

## Configuration

```javascript
const client = new CoinGeckoClient({
  timeout: 10000,
  apiKey: 'your-pro-api-key',
});
```

### Options

| Option      | Type   | Default | Description                                  |
| ----------- | ------ | ------- | -------------------------------------------- |
| `timeout` | number | 10000   | Request timeout in milliseconds              |
| `apiKey`  | string | null    | CoinGecko Pro API key for higher rate limits |

## API Methods

### Basic Price Data

#### getSimplePrice(ids, vsCurrencies, options)

Get current prices for cryptocurrencies in specified currencies.

```javascript
const prices = await client.getSimplePrice('bitcoin', 'usd');

const multiplePrices = await client.getSimplePrice(['bitcoin', 'ethereum'], ['usd', 'eur'], {
  include_market_cap: true,
  include_24hr_change: true,
  include_last_updated_at: true,
});
```

#### getSupportedVsCurrencies()

Get list of all supported fiat currencies and cryptocurrencies.

```javascript
const currencies = await client.getSupportedVsCurrencies();
```

### Coin Information

#### getCoinsList(includePlatform)

Get list of all supported coins with id, name, and symbol.

```javascript
const coins = await client.getCoinsList();
const coinsWithPlatform = await client.getCoinsList(true);
```

#### getCoinById(id, options)

Get detailed information about a specific coin.

```javascript
const bitcoin = await client.getCoinById('bitcoin');

const bitcoinDetailed = await client.getCoinById('bitcoin', {
  localization: false,
  tickers: true,
  marketData: true,
  communityData: true,
  developerData: true,
  sparkline: true,
});
```

#### getCoinsMarkets(vsCurrency, options)

Get market data for multiple coins.

```javascript
const marketData = await client.getCoinsMarkets('usd');

const customMarketData = await client.getCoinsMarkets('usd', {
  order: 'market_cap_desc',
  perPage: 50,
  page: 1,
  sparkline: false,
  priceChangePercentage: '1h,24h,7d',
});
```

### Historical Data

#### getCoinHistory(id, date, localization)

Get historical data for a coin on a specific date.

```javascript
const history = await client.getCoinHistory('bitcoin', '30-12-2023');
```

#### getCoinMarketChart(id, vsCurrency, days, options)

Get market chart data (price, market cap, volume).

```javascript
const chartData = await client.getCoinMarketChart('bitcoin', 'usd', 7);

const hourlyData = await client.getCoinMarketChart('ethereum', 'usd', 1, {
  interval: 'hourly',
});
```

#### getCoinMarketChartRange(id, vsCurrency, from, to)

Get market chart data within a specific date range.

```javascript
const fromTimestamp = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
const toTimestamp = Math.floor(Date.now() / 1000);

const rangeData = await client.getCoinMarketChartRange('bitcoin', 'usd', fromTimestamp, toTimestamp);
```

#### getCoinOHLC(id, vsCurrency, days)

Get OHLC (Open, High, Low, Close) data.

```javascript
const ohlcData = await client.getCoinOHLC('bitcoin', 'usd', 7);
```

### Exchange Data

#### getExchangesList()

Get list of all exchanges.

```javascript
const exchanges = await client.getExchangesList();
```

#### getExchangeById(id)

Get detailed information about a specific exchange.

```javascript
const binance = await client.getExchangeById('binance');
```

#### getExchangeTickers(id, options)

Get tickers from a specific exchange.

```javascript
const tickers = await client.getExchangeTickers('binance');

const filteredTickers = await client.getExchangeTickers('binance', {
  coinIds: 'bitcoin,ethereum',
  includeExchangeLogo: true,
  page: 1,
  depth: true,
  order: 'trust_score_desc',
});
```

### Global Market Data

#### getGlobalData()

Get global cryptocurrency market data.

```javascript
const globalData = await client.getGlobalData();
console.log('Total Market Cap:', globalData.data.total_market_cap.usd);
console.log('Market Cap Change 24h:', globalData.data.market_cap_change_percentage_24h_usd);
```

#### getGlobalDeFiData()

Get global DeFi market data.

```javascript
const defiData = await client.getGlobalDeFiData();
```

### Trending & Search

#### getTrendingCoins()

Get trending cryptocurrencies.

```javascript
const trending = await client.getTrendingCoins();
console.log('Trending coins:', trending.coins);
console.log('Trending NFTs:', trending.nfts);
```

#### searchCoins(query)

Search for coins, exchanges, and categories.

```javascript
const searchResults = await client.searchCoins('bitcoin');
```

### Utility

#### ping()

Check API server status.

```javascript
const status = await client.ping();
```

## Error Handling

The SDK provides comprehensive error handling with descriptive error messages:

```javascript
try {
  const data = await client.getCoinById('invalid-coin-id');
} catch (error) {
  if (error.message.includes('CoinGecko API Error: 404')) {
    console.log('Coin not found');
  } else if (error.message.includes('Network Error')) {
    console.log('Connection issue');
  } else {
    console.log('Other error:', error.message);
  }
}
```

### Error Types

- **API Errors**: HTTP errors from CoinGecko API (400, 404, 429, 500, etc.)
- **Network Errors**: Connection timeouts or network issues
- **Request Errors**: Invalid parameters or malformed requests

### Rate Limiting

CoinGecko API has rate limits:

- **Free Plan**: 10-30 calls/minute
- **Pro Plan**: Higher limits with API key

```javascript
const client = new CoinGeckoClient({
  apiKey: 'your-pro-api-key',
});
```

## Examples

Run example scripts:

```bash
npm run example:basic
npm run example:advanced
```

## Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

## API Reference

For complete API documentation, visit: [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/amrulizwan/coingecko-client)
- 🐛 [Report Issues](https://github.com/amrulizwan/coingecko-client/issues)
- 💬 [Discussions](https://github.com/amrulizwan/coingecko-client/discussions)

## Disclaimer

This library is not officially affiliated with CoinGecko. Use at your own risk and ensure compliance with CoinGecko's Terms of Service.
