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
- Works with both Node.js and browser environments.
- Synchronous operation for easy use in React and Next.js client components and other frameworks.
- Configurable caching and lazy loading for improved performance

## Usage

```javascript
import I18nAtlas from 'i18n-atlas';

// Initialize with options
const atlas = new I18nAtlas({
  preload: true,
  useMap: true,
  cacheResults: true,
  cacheDuration: 3600 // 1 hour
});

// In a React component
function CountryInfo() {
  // Get all countries
  const allCountries = atlas.getAllCountries();

  // Get a country by code
  const country = atlas.getCountryByCode('US');

  // Get all states
  const allStates = atlas.getAllStates();

  // Get states for a specific country
  const usStates = atlas.getStatesByCountry('US');

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

- `preload` (boolean): Preload all data on initialization. Default: `false`
- `useMap` (boolean): Use Map data structure for faster lookups. Default: `true`
- `cacheResults` (boolean): Cache results of queries. Default: `false`
- `cacheDuration` (number): Duration in seconds to keep cached results. Default: `3600` (1 hour)

Example:

```javascript
const atlas = new I18nAtlas({
  preload: true,
  useMap: true,
  cacheResults: true,
  cacheDuration: 7200 // 2 hours
});
```

## Data

The data for this package is sourced from this [GitHub repository](https://github.com/dr5hn/countries-states-cities-database).

### Countries

The `data/countries.json` file contains an array of country objects. Here's an example of a country object:

```json
{
    "id": 1,
    "name": "Afghanistan",
    "iso3": "AFG",
    "iso2": "AF",
    "numeric_code": "004",
    "phone_code": "93",
    "capital": "Kabul",
    "currency": "AFN",
    "currency_name": "Afghan afghani",
    "currency_symbol": "؋",
    "tld": ".af",
    "native": "افغانستان",
    "region": "Asia",
    "region_id": "3",
    "subregion": "Southern Asia",
    "subregion_id": "14",
    "nationality": "Afghan",
    "timezones": [
        {
            "zoneName": "Asia\/Kabul",
            "gmtOffset": 16200,
            "gmtOffsetName": "UTC+04:30",
            "abbreviation": "AFT",
            "tzName": "Afghanistan Time"
        }
    ],
    "translations": {
        "ar": "أفغانستان",
        "kr": "아프가니스탄",
        "pt-BR": "Afeganistão",
        "pt": "Afeganistão",
        "nl": "Afghanistan",
        "hr": "Afganistan",
        "fa": "افغانستان",
        "de": "Afghanistan",
        "es": "Afganistán",
        "fr": "Afghanistan",
        "ja": "アフガニスタン",
        "it": "Afghanistan",
        "cn": "阿富汗",
        "tr": "Afganistan",
        "ru": "Афганистан",
        "uk": "Афганістан",
        "pl": "Afganistan"
    },
    "latitude": "33.00000000",
    "longitude": "65.00000000",
    "emoji": "🇦🇫",
    "emojiU": "U+1F1E6 U+1F1EB"
}
```

## API

- `getAllCountries()`: Returns an array of all countries.
- `getCountryByCode(code)`: Returns a country object for the given ISO2 or ISO3 code.
- `getAllStates()`: Returns an array of all states.
- `getStatesByCountry(countryCode)`: Returns an array of states for the given country code.

Each country object includes a `translations` property with translations of the country name in the supported languages.

## Translations

To access translations for a country, use the `translations` property of the country object. For example:

```javascript
const country = atlas.getCountryByCode('FR');
console.log(country.translations.de); // Outputs: Frankreich
console.log(country.translations.ja); // Outputs: フランス
```

## Supported Languages

1. Arabic (ar)
2. Korean (kr)
3. Brazilian Portuguese (pt-BR)
4. Portuguese (pt)
5. Dutch (nl)
6. Croatian (hr)
7. Persian/Farsi (fa)
8. German (de)
9. Spanish (es)
10. French (fr)
11. Japanese (ja)
12. Italian (it)
13. Chinese (cn)
14. Turkish (tr)
15. Russian (ru)
16. Ukrainian (uk)
17. Polish (pl)

## Performance Considerations

- Use the `preload` option if you need quick access to all data and have sufficient memory.
- The `useMap` option provides faster lookups for large datasets.
- Enable `cacheResults` for frequently accessed data to improve performance.
- Adjust `cacheDuration` based on how often your data changes.

## License

MIT
