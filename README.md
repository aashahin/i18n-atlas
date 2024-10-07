# i18n-atlas

A high-performance Node.js package providing multilingual information about countries and states, using ES modules. This package offers optimized data retrieval for countries and states, including translations for country names in 17 languages.

## Installation

```
npm install i18n-atlas
```

## Features

- High-performance retrieval of comprehensive information about countries and states
- Efficient access to phone codes, currency, and timezones
- Optimized data structures for fast lookups
- Support for country and state data in JSON
- Support for country name translations in 17 languages
- Support for TypeScript type definitions
- Works with both Node.js and browser environments
- Asynchronous operations for improved performance and better integration with modern frameworks
- Configurable caching and lazy loading for improved performance

## Usage

```javascript
import I18nAtlas from 'i18n-atlas';

// Initialize with options
const atlas = new I18nAtlas({
  useMap: true,
  cacheResults: true,
  cacheDuration: 3600 // 1 hour
});

// In an async function or React component
async function CountryInfo() {
  // Get all countries
  const allCountries = await atlas.getAllCountries();

  // Get a country by code
  const country = await atlas.getCountryByCode('US');

  // Get all states
  const allStates = await atlas.getAllStates();

  // Get states for a specific country
  const usStates = await atlas.getStatesByCountry('US');

  // Access translations
  const usaTranslations = country.translations;

  return (
    <div>
      <p>USA in Spanish: {usaTranslations.es}</p>
      <p>USA in Japanese: {usaTranslations.ja}</p>
    </div>
  );
}
```

## Configuration Options

When initializing `I18nAtlas`, you can pass an options object with the following properties:

- `useMap` (boolean): Use Map data structure for faster lookups. Default: `true`
- `cacheResults` (boolean): Cache results of queries. Default: `false`
- `cacheDuration` (number): Duration in seconds to keep cached results. Default: `3600` (1 hour)

Example:

```javascript
const atlas = new I18nAtlas({
  useMap: true,
  cacheResults: true,
  cacheDuration: 7200 // 2 hours
});
```

## Data

[Data section remains the same]

## API

- `getAllCountries()`: Returns a promise that resolves to an array of all countries.
- `getCountryByCode(code)`: Returns a promise that resolves to a country object for the given ISO2 or ISO3 code.
- `getAllStates()`: Returns a promise that resolves to an array of all states.
- `getStatesByCountry(countryCode)`: Returns a promise that resolves to an array of states for the given country code.

Each country object includes a `translations` property with translations of the country name in the supported languages.

## Translations

[Translations section remains the same]

## Supported Languages

[Supported Languages section remains the same]

## Performance Considerations

- The `useMap` option provides faster lookups for large datasets.
- Enable `cacheResults` for frequently accessed data to improve performance.
- Adjust `cacheDuration` based on how often your data changes.
- All methods are now asynchronous, allowing for better performance in modern JavaScript environments.

## License

MIT
