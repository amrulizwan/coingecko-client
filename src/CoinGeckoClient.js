const axios = require('axios');

class CoinGeckoClient {
  constructor(options = {}) {
    this.baseURL = 'https://api.coingecko.com/api/v3';
    this.timeout = options.timeout || 10000;
    this.apiKey = options.apiKey || null;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'x-cg-demo-api-key': this.apiKey }),
      },
    });

    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          throw new Error(`CoinGecko API Error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Network Error: Unable to reach CoinGecko API');
        } else {
          throw new Error(`Request Error: ${error.message}`);
        }
      }
    );
  }

  async ping() {
    return await this.client.get('/ping');
  }

  async getSimplePrice(ids, vsCurrencies, options = {}) {
    const params = {
      ids: Array.isArray(ids) ? ids.join(',') : ids,
      vs_currencies: Array.isArray(vsCurrencies) ? vsCurrencies.join(',') : vsCurrencies,
      ...options,
    };
    return await this.client.get('/simple/price', { params });
  }

  async getCoinsList(includePlatform = false) {
    return await this.client.get('/coins/list', {
      params: { include_platform: includePlatform },
    });
  }

  async getCoinsMarkets(vsCurrency, options = {}) {
    const params = {
      vs_currency: vsCurrency,
      order: options.order || 'market_cap_desc',
      per_page: options.perPage || 100,
      page: options.page || 1,
      sparkline: options.sparkline || false,
      price_change_percentage: options.priceChangePercentage || null,
      ...options,
    };
    return await this.client.get('/coins/markets', { params });
  }

  async getCoinById(id, options = {}) {
    const params = {
      localization: options.localization || false,
      tickers: options.tickers || false,
      market_data: options.marketData || true,
      community_data: options.communityData || false,
      developer_data: options.developerData || false,
      sparkline: options.sparkline || false,
    };
    return await this.client.get(`/coins/${id}`, { params });
  }

  async getCoinHistory(id, date, localization = false) {
    return await this.client.get(`/coins/${id}/history`, {
      params: { date, localization },
    });
  }

  async getCoinMarketChart(id, vsCurrency, days, options = {}) {
    const params = {
      vs_currency: vsCurrency,
      days,
      interval: options.interval || null,
    };
    return await this.client.get(`/coins/${id}/market_chart`, { params });
  }

  async getCoinMarketChartRange(id, vsCurrency, from, to) {
    return await this.client.get(`/coins/${id}/market_chart/range`, {
      params: { vs_currency: vsCurrency, from, to },
    });
  }

  async getCoinOHLC(id, vsCurrency, days) {
    return await this.client.get(`/coins/${id}/ohlc`, {
      params: { vs_currency: vsCurrency, days },
    });
  }

  async getExchangesList() {
    return await this.client.get('/exchanges');
  }

  async getExchangeById(id) {
    return await this.client.get(`/exchanges/${id}`);
  }

  async getExchangeTickers(id, options = {}) {
    const params = {
      coin_ids: options.coinIds || null,
      include_exchange_logo: options.includeExchangeLogo || false,
      page: options.page || 1,
      depth: options.depth || false,
      order: options.order || 'trust_score_desc',
    };
    return await this.client.get(`/exchanges/${id}/tickers`, { params });
  }

  async getGlobalData() {
    return await this.client.get('/global');
  }

  async getGlobalDeFiData() {
    return await this.client.get('/global/decentralized_finance_defi');
  }

  async getTrendingCoins() {
    return await this.client.get('/search/trending');
  }

  async getSupportedVsCurrencies() {
    return await this.client.get('/simple/supported_vs_currencies');
  }

  async searchCoins(query) {
    return await this.client.get('/search', { params: { query } });
  }
}

module.exports = CoinGeckoClient;
