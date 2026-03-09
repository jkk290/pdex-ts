import { Location } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandExplore(
    state: State,
    areaName: string,
): Promise<void> {
    if (!areaName) {
        console.log("No area entered");
        return;
    }
    const location: Location = await state.pokeApi.fetchLocation(areaName);
    const encounters = location.pokemon_encounters;
    console.log("Found Pokemon:");
    for (const pokemon of encounters) {
        console.log(` - ${pokemon.pokemon.name}`);
    }
}
