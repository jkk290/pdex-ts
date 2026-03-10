import { State } from "./state";

export async function commandCatch(
    state: State,
    pokemonName: string,
): Promise<void> {
    if (!pokemonName) {
        console.log("Pokemon not specified");
        return;
    }
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
    const catchRate = Math.random() * 400;
    if (catchRate > pokemon.base_experience) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemon;
        return;
    }
    console.log(`${pokemonName} escaped!`);
}
