const CoinGeckoClient = require('../src');

describe('CoinGeckoClient', () => {
  let client;

  beforeEach(() => {
    client = new CoinGeckoClient();
  });

  describe('Constructor', () => {
    test('should create client with default options', () => {
      expect(client.baseURL).toBe('https://api.coingecko.com/api/v3');
      expect(client.timeout).toBe(10000);
      expect(client.apiKey).toBeNull();
    });

    test('should create client with custom options', () => {
      const customClient = new CoinGeckoClient({
        timeout: 5000,
        apiKey: 'test-key',
      });
      expect(customClient.timeout).toBe(5000);
      expect(customClient.apiKey).toBe('test-key');
    });
  });

  describe('API Methods', () => {
    test('should have all required methods', () => {
      const methods = [
        'ping',
        'getSimplePrice',
        'getCoinsList',
        'getCoinsMarkets',
        'getCoinById',
        'getCoinHistory',
        'getCoinMarketChart',
        'getCoinMarketChartRange',
        'getCoinOHLC',
        'getExchangesList',
        'getExchangeById',
        'getExchangeTickers',
        'getGlobalData',
        'getGlobalDeFiData',
        'getTrendingCoins',
        'getSupportedVsCurrencies',
        'searchCoins',
      ];

      methods.forEach((method) => {
        expect(typeof client[method]).toBe('function');
      });
    });
  });

  describe('Parameter Processing', () => {
    test('should handle array parameters correctly', () => {
      const mockGet = jest.fn();
      client.client.get = mockGet;

      const ids = ['bitcoin', 'ethereum'];
      const currencies = ['usd', 'eur'];

      client.getSimplePrice(ids, currencies);

      expect(mockGet).toHaveBeenCalledWith('/simple/price', {
        params: {
          ids: 'bitcoin,ethereum',
          vs_currencies: 'usd,eur',
        },
      });
    });

    test('should handle string parameters correctly', () => {
      const mockGet = jest.fn();
      client.client.get = mockGet;

      client.getSimplePrice('bitcoin', 'usd');

      expect(mockGet).toHaveBeenCalledWith('/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd',
        },
      });
    });
  });
});
