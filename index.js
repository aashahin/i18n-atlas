import countriesData from "./data/countries.json" assert { type: "json" };
import statesData from "./data/states.json" assert { type: "json" };

class I18nAtlas {
  constructor(options = {}) {
    this.options = {
      preload: options.preload || false,
      useMap: options.useMap !== undefined ? options.useMap : true,
      cacheResults: options.cacheResults || false,
      cacheDuration: options.cacheDuration || 3600,
      ...options,
    };

    this.countriesData = null;
    this.statesData = null;
    this.countryMap = null;
    this.stateMap = null;
    this.countryCodeSet = null;
    this.cache = new Map();

    if (this.options.preload) {
      this.preloadData();
    }
  }

  preloadData() {
    if (!this.countriesData) this.countriesData = countriesData;
    if (!this.statesData) this.statesData = statesData;
    if (this.options.useMap && !this.countryCodeSet) {
      this.initializeCountryCodeSet();
    }
  }

  initializeCountryCodeSet() {
    this.countryCodeSet = new Set(
      this.countriesData.flatMap((country) => [country.iso2, country.iso3]),
    );
  }

  lazyInitializeCountryMap() {
    if (!this.countryMap) {
      this.countryMap = new Map(
        this.countriesData.flatMap((country) => [
          [country.iso2, country],
          [country.iso3, country],
        ]),
      );
    }
  }

  lazyInitializeStateMap() {
    if (!this.stateMap) {
      this.stateMap = this.statesData.reduce((map, state) => {
        if (!map.has(state.country_code)) {
          map.set(state.country_code, []);
        }
        map.get(state.country_code).push(state);
        return map;
      }, new Map());
    }
  }

  memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = args.join(",");
      if (cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
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

  getAllCountries = this.memoize(() => {
    this.preloadData();
    return [...this.countriesData];
  });

  getCountryByCode = this.memoize((code) => {
    this.preloadData();
    if (this.options.useMap) {
      this.lazyInitializeCountryMap();
      return this.countryMap.get(code);
    }
    return this.countriesData.find(
      (country) =>
        this.countryCodeSet.has(code) &&
        (country.iso2 === code || country.iso3 === code),
    );
  });

  getAllStates = this.memoize(() => {
    this.preloadData();
    return [...this.statesData];
  });

  getStatesByCountry = this.memoize((countryCode) => {
    this.preloadData();
    if (this.options.useMap) {
      this.lazyInitializeStateMap();
      return [...(this.stateMap.get(countryCode) || [])];
    }
    return this.statesData.filter(
      (state) => state.country_code === countryCode,
    );
  });
}

const atlas = new I18nAtlas({
  preload: true,
  useMap: true,
  cacheResults: true,
  cacheDuration: 10,
});
console.log(atlas.getAllCountries());

export default I18nAtlas;
