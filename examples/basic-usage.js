const CoinGeckoClient = require('../src');

async function basicUsageExample() {
  const client = new CoinGeckoClient();

  try {
    console.log('=== CoinGecko API Basic Usage ===\n');

    const pingResult = await client.ping();
    console.log('1. API Status:', pingResult);

    const bitcoinPrice = await client.getSimplePrice('bitcoin', 'usd');
    console.log('2. Bitcoin Price:', bitcoinPrice);

    const topCoins = await client.getCoinsMarkets('usd', { perPage: 5 });
    console.log('3. Top 5 Coins by Market Cap:');
    topCoins.forEach((coin, index) => {
      console.log(`   ${index + 1}. ${coin.name} (${coin.symbol.toUpperCase()}): $${coin.current_price}`);
    });

    const bitcoinData = await client.getCoinById('bitcoin');
    console.log('4. Bitcoin Details:');
    console.log(`   Name: ${bitcoinData.name}`);
    console.log(`   Market Cap Rank: ${bitcoinData.market_cap_rank}`);
    console.log(`   Current Price (USD): $${bitcoinData.market_data.current_price.usd}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

basicUsageExample();
