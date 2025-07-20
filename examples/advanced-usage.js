const CoinGeckoClient = require('../src');

async function advancedUsageExample() {
  const client = new CoinGeckoClient({
    timeout: 15000,
  });

  try {
    console.log('=== CoinGecko API Advanced Usage ===\n');

    const trending = await client.getTrendingCoins();
    console.log('1. Trending Coins:');
    trending.coins.slice(0, 3).forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.item.name} (${item.item.symbol})`);
    });

    const globalData = await client.getGlobalData();
    console.log('\n2. Global Crypto Market Data:');
    console.log(`   Total Market Cap: $${globalData.data.total_market_cap.usd.toLocaleString()}`);
    console.log(`   Total Volume: $${globalData.data.total_volume.usd.toLocaleString()}`);
    console.log(`   Market Cap Change 24h: ${globalData.data.market_cap_change_percentage_24h_usd.toFixed(2)}%`);

    const ethereumChart = await client.getCoinMarketChart('ethereum', 'usd', 7);
    console.log('\n3. Ethereum 7-Day Price Chart (Last 3 Points):');
    const prices = ethereumChart.prices.slice(-3);
    prices.forEach((price, index) => {
      const date = new Date(price[0]).toLocaleDateString();
      console.log(`   ${date}: $${price[1].toFixed(2)}`);
    });

    const exchanges = await client.getExchangesList();
    console.log('\n4. Top 3 Exchanges by Trust Score:');
    exchanges.slice(0, 3).forEach((exchange, index) => {
      console.log(`   ${index + 1}. ${exchange.name} - Trust Score: ${exchange.trust_score}`);
    });

    const multiplePrices = await client.getSimplePrice(['bitcoin', 'ethereum', 'cardano'], ['usd', 'eur'], {
      include_market_cap: true,
      include_24hr_change: true,
    });
    console.log('\n5. Multiple Coins in Multiple Currencies:');
    Object.entries(multiplePrices).forEach(([coin, data]) => {
      console.log(`   ${coin.toUpperCase()}:`);
      console.log(`     USD: $${data.usd} (24h: ${data.usd_24h_change?.toFixed(2)}%)`);
      console.log(`     EUR: €${data.eur} (24h: ${data.eur_24h_change?.toFixed(2)}%)`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

advancedUsageExample();
