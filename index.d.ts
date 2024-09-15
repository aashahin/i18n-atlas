declare module "i18n-atlas" {
  export interface State {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: string | null;
    latitude: string;
    longitude: string;
  }

  export interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }

  export interface Translations {
    ar: string;
    kr: string;
    "pt-BR": string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    cn: string;
    tr: string;
    ru: string;
    uk: string;
    pl: string;
  }

  export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: string;
    subregion: string;
    subregion_id: string;
    nationality: string;
    timezones: Timezone[];
    translations: Translations;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
  }

  export interface I18nAtlasOptions {
    preload?: boolean;
    useMap?: boolean;
    cacheResults?: boolean;
    cacheDuration?: number;
  }

  export default class I18nAtlas {
    constructor(options?: I18nAtlasOptions);

    getAllCountries: () => Country[];
    getCountryByCode: (code: string) => Country | undefined;
    getAllStates: () => State[];
    getStatesByCountry: (countryCode: string) => State[];

    private preloadData(): void;
    private initializeCountryCodeSet(): void;
    private lazyInitializeCountryMap(): void;
    private lazyInitializeStateMap(): void;
    private memoize<T extends (...args: any[]) => any>(fn: T): T;
    private getCachedOrExecute<T>(key: string, executeFn: () => T): T;
  }
}
