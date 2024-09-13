# i18n-atlas

A Node.js package providing multilingual information about countries and states, using ES modules. This package offers data on countries and states, including translations for country names in 16 languages.

## Installation

```
npm install i18n-atlas
```

## Features

- Retrieve comprehensive information about countries and states
- Support for country name translations in 16 languages
- Synchronous operation for easy use in React and Next.js client components

## Usage

```javascript
import I18nAtlas from 'i18n-atlas';

// In a React component
function CountryInfo() {
  const atlas = new I18nAtlas();

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

## API

- `getAllCountries()`: Returns an array of all countries.
- `getCountryByCode(code)`: Returns a country object for the given ISO2 or ISO3 code.
- `getAllStates()`: Returns an array of all states.
- `getStatesByCountry(countryCode)`: Returns an array of states for the given country code.

Each country object includes a `translations` property with translations of the country name in the supported languages.

## Translations

To access translations for a country, use the `translations` property of the country object. For example:

```javascript
const atlas = new I18nAtlas();
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

## License

MIT
