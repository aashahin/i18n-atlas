import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class I18nAtlas {
  constructor() {
    const countriesData = fs.readFileSync(
      path.join(__dirname, "data", "countries.json"),
      "utf8",
    );
    const statesData = fs.readFileSync(
      path.join(__dirname, "data", "states.json"),
      "utf8",
    );

    this.countries = JSON.parse(countriesData);
    this.states = JSON.parse(statesData);
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
