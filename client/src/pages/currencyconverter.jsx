import React, { useState, useEffect } from 'react';

// Enhanced currency data with more currencies and hardcoded exchange rates (base: USD)
// Rates are approximate and should be updated periodically
const EXCHANGE_RATES = {
  USD: 1.00,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.50,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.50,
  BRL: 5.20,
  MXN: 20.50,
  SGD: 1.35,
  HKD: 7.78,
  KRW: 1180.00,
  SEK: 8.65,
  NOK: 8.85,
  DKK: 6.30,
  PLN: 3.85,
  CZK: 21.50,
  HUF: 300.00,
  RUB: 75.00,
  TRY: 8.50,
  ZAR: 14.50,
  THB: 33.50,
  MYR: 4.15,
  IDR: 14200.00,
  PHP: 50.50,
  VND: 23000.00,
  NZD: 1.45,
  ILS: 3.25
};

// Currency information for display
const CURRENCY_INFO = {
  USD: { name: 'US Dollar', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'British Pound', symbol: '£' },
  JPY: { name: 'Japanese Yen', symbol: '¥' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$' },
  AUD: { name: 'Australian Dollar', symbol: 'A$' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF' },
  CNY: { name: 'Chinese Yuan', symbol: '¥' },
  INR: { name: 'Indian Rupee', symbol: '₹' },
  BRL: { name: 'Brazilian Real', symbol: 'R$' },
  MXN: { name: 'Mexican Peso', symbol: '$' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$' },
  HKD: { name: 'Hong Kong Dollar', symbol: 'HK$' },
  KRW: { name: 'South Korean Won', symbol: '₩' },
  SEK: { name: 'Swedish Krona', symbol: 'kr' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr' },
  DKK: { name: 'Danish Krone', symbol: 'kr' },
  PLN: { name: 'Polish Złoty', symbol: 'zł' },
  CZK: { name: 'Czech Koruna', symbol: 'Kč' },
  HUF: { name: 'Hungarian Forint', symbol: 'Ft' },
  RUB: { name: 'Russian Ruble', symbol: '₽' },
  TRY: { name: 'Turkish Lira', symbol: '₺' },
  ZAR: { name: 'South African Rand', symbol: 'R' },
  THB: { name: 'Thai Baht', symbol: '฿' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM' },
  IDR: { name: 'Indonesian Rupiah', symbol: 'Rp' },
  PHP: { name: 'Philippine Peso', symbol: '₱' },
  VND: { name: 'Vietnamese Dong', symbol: '₫' },
  NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' },
  ILS: { name: 'Israeli Shekel', symbol: '₪' }
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(false);

  // Convert amount from one currency to another
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Convert to USD first (base currency), then to target currency
    const usdAmount = amount / EXCHANGE_RATES[fromCurrency];
    const convertedAmount = usdAmount * EXCHANGE_RATES[toCurrency];
    
    return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
  };

  // Get exchange rate between two currencies
  const getExchangeRate = (fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
      return 1;
    }
    
    return EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];
  };

  // Format currency amount based on currency type
  const formatCurrency = (amount, currency) => {
    // Some currencies don't use decimal places
    const noDecimalCurrencies = ['JPY', 'KRW', 'IDR', 'VND', 'HUF'];
    
    if (noDecimalCurrencies.includes(currency)) {
      return Math.round(amount).toLocaleString();
    }
    
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Perform conversion when inputs change
  useEffect(() => {
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      setConvertedAmount(null);
      setConversionRate(null);
      return;
    }

    if (!fromCurrency || !toCurrency) {
      setError('Please select both currencies.');
      setConvertedAmount(null);
      setConversionRate(null);
      return;
    }

    try {
      const converted = convertCurrency(amount, fromCurrency, toCurrency);
      const rate = getExchangeRate(fromCurrency, toCurrency);
      
      setConvertedAmount(converted);
      setConversionRate(rate);
      setError('');
      setIsOffline(true); // Indicate we're using offline rates
    } catch (err) {
      setError('Conversion failed. Please check your inputs.');
      setConvertedAmount(null);
      setConversionRate(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  // Get sorted currencies for dropdowns
  const sortedCurrencies = Object.keys(EXCHANGE_RATES).sort();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4 font-inter">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Travel Wallet</h1>
          <p className="text-gray-600">Convert currencies instantly - Works offline!</p>
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-200 text-lg"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="fromCurrency" className="block text-sm font-semibold text-gray-700 mb-2">From Currency</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none appearance-none bg-white pr-8 text-lg"
          >
            {sortedCurrencies.map((code) => (
              <option key={code} value={code}>
                {code} - {CURRENCY_INFO[code].name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label htmlFor="toCurrency" className="block text-sm font-semibold text-gray-700 mb-2">To Currency</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none appearance-none bg-white pr-8 text-lg"
          >
            {sortedCurrencies.map((code) => (
              <option key={code} value={code}>
                {code} - {CURRENCY_INFO[code].name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl shadow-inner border border-pink-100">
          {error ? (
            <p className="text-red-600 text-lg font-medium">{error}</p>
          ) : (
            convertedAmount !== null && (
              <>
                <div className="text-3xl font-bold text-pink-700 mb-3">
                  {formatCurrency(amount, fromCurrency)} {fromCurrency} = {formatCurrency(convertedAmount, toCurrency)} {toCurrency}
                </div>
                {conversionRate && (
                  <div className="text-lg text-purple-600 mb-2">
                    1 {fromCurrency} = {conversionRate.toFixed(4)} {toCurrency}
                  </div>
                )}
                <div className="text-sm text-gray-500 italic">
                  {isOffline ? 'Using offline rates' : 'Real-time rates'}
                </div>
              </>
            )
          )}
        </div>

        {/* Currency count and offline indicator */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">{sortedCurrencies.length}+ currencies</span> available
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Offline Mode
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;