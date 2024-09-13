import countriesData from "./data/countries.json";
import statesData from "./data/states.json";

class I18nAtlas {
  constructor() {
    this.countries = countriesData;
    this.states = statesData;
  }

  getAllCountries() {
    return this.countries;
  }

  getCountryByCode(code) {
    return this.countries.find(
      (country) => country.iso2 === code || country.iso3 === code,
    );
  }

  getAllStates() {
    return this.states;
  }

  getStatesByCountry(countryCode) {
    return this.states.filter((state) => state.country_code === countryCode);
  }
}

export default I18nAtlas;
