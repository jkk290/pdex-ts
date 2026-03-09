import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    pokeCache: Cache;

    constructor() {
        this.pokeCache = new Cache(30000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let url = `${PokeAPI.baseURL}/location-area/`;
        if (pageURL) {
            url = pageURL;
        }
        if (this.pokeCache.get(url)) {
            return this.pokeCache.get(url) as ShallowLocations;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            this.pokeCache.add(url, data);
            return data as ShallowLocations;
        } catch (err) {
            throw new Error(
                `Error fetching locations: ${(err as Error).message}`,
            );
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return (await response.json()) as Location;
        } catch (err) {
            throw new Error(
                `Error fetching location: ${(err as Error).message}`,
            );
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        };
    }[];
    location: Location;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                conditon_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_change: number;
            version: {
                name: string;
                url: string;
            };
        };
    }[];
};
