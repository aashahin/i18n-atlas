class I18nAtlas {
  constructor(options = {}) {
    this.options = {
      useMap: options.useMap !== undefined ? options.useMap : true,
      cacheResults: options.cacheResults || false,
      cacheDuration: options.cacheDuration || 3600,
      ...options,
    };

    this.countriesData = null;
    this.statesData = null;
    this.countryMap = null;
    this.stateMap = null;
    this.cache = new Map();
  }

  async loadCountriesData() {
    if (!this.countriesData) {
      const module = await import("./data/countries.json");
      this.countriesData = module.default;
      if (this.options.useMap) {
        this.countryMap = new Map(
          this.countriesData.flatMap((country) => [
            [country.iso2, country],
            [country.iso3, country],
          ]),
        );
      }
    }
  }

  async loadStatesData() {
    if (!this.statesData) {
      const module = await import("./data/states.json");
      this.statesData = module.default;
      if (this.options.useMap) {
        this.stateMap = this.statesData.reduce((map, state) => {
          if (!map.has(state.country_code)) {
            map.set(state.country_code, []);
          }
          map.get(state.country_code).push(state);
          return map;
        }, new Map());
      }
    }
  }

  getCachedOrExecute(key, executeFn) {
    if (this.options.cacheResults) {
      const cachedResult = this.cache.get(key);
      if (cachedResult) return cachedResult;
    }

    const result = executeFn();

    if (this.options.cacheResults) {
      this.cache.set(key, result);
      setTimeout(
        () => this.cache.delete(key),
        this.options.cacheDuration * 1000,
      );
    }

    return result;
  }

  async getAllCountries() {
    await this.loadCountriesData();
    return this.getCachedOrExecute("allCountries", () => [
      ...this.countriesData,
    ]);
  }

  async getCountryByCode(code) {
    await this.loadCountriesData();
    return this.getCachedOrExecute(`country:${code}`, () =>
      this.options.useMap
        ? this.countryMap.get(code)
        : this.countriesData.find(
            (country) => country.iso2 === code || country.iso3 === code,
          ),
    );
  }

  async getAllStates() {
    await this.loadStatesData();
    return this.getCachedOrExecute("allStates", () => [...this.statesData]);
  }

  async getStatesByCountry(countryCode) {
    await this.loadStatesData();
    return this.getCachedOrExecute(`states:${countryCode}`, () =>
      this.options.useMap
        ? [...(this.stateMap.get(countryCode) || [])]
        : this.statesData.filter((state) => state.country_code === countryCode),
    );
  }
}

export default I18nAtlas;
