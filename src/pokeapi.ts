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
        if (this.pokeCache.get(url)) {
            return this.pokeCache.get(url) as Location;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            this.pokeCache.add(url, data);
            return data as Location;
        } catch (err) {
            throw new Error(
                `Error fetching location: ${(err as Error).message}`,
            );
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        if (this.pokeCache.get(url)) {
            return this.pokeCache.get(url) as Pokemon;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            this.pokeCache.add(url, data);
            return data as Pokemon;
        } catch (err) {
            throw new Error(
                `Error fetching pokemon: ${(err as Error).message}`,
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

export type Pokemon = {
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            order?: number;
            version_group: {
                name: string;
                url: string;
            };
        }[];
    }[];
    name: string;
    order: number;
    past_abilities: {
        abilities: {
            ability: any;
            is_hidden: boolean;
            slot: number;
        }[];
        generation: {
            name: string;
            url: string;
        };
    }[];
    past_stats: {
        generation: {
            name: string;
            url: string;
        };
        stats: {
            base_stat: number;
            effort: number;
            stat: {
                name: string;
                url: string;
            };
        }[];
    }[];
    past_types: any[];
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_femail: any;
        other: {
            dream_world: {
                front_default: string;
                front_female: any;
            };
            home: {
                front_default: string;
                front_female: any;
                front_shiny: string;
                fonrt_shiny_female: any;
            };
            "official-artwork": {
                front_default: string;
                front_shiny: string;
            };
            showdown: {
                back_default: string;
                back_female: any;
                back_shiny: string;
                back_shiny_female: any;
                front_default: string;
                front_female: any;
                front_shiny: string;
                front_shiny_female: any;
            };
        };
        versions: {
            "generation-i": {
                "red-blue": {
                    back_default: string;
                    back_gray: string;
                    back_transparent: string;
                    front_default: string;
                    front_gray: string;
                    front_transparent: string;
                };
                yellow: {
                    back_default: string;
                    back_gray: string;
                    back_transparent: string;
                    front_default: string;
                    front_gray: string;
                    front_transparent: string;
                };
            };
            "generation-ii": any;
            "generation-iii": any;
            "generation-iv": any;
            "generation-ix": any;
            "generation-v": any;
            "generation-vi": any;
            "generation-vii": any;
            "generation-viii": any;
        };
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    weight: number;
};
