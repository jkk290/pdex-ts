import { State } from "./state";

export async function commandInspect(
    state: State,
    pokemonName: string,
): Promise<void> {
    if (!pokemonName) {
        console.log("Pokemon not specified");
        return;
    }
    if (!state.pokedex[pokemonName]) {
        console.log("you have not caught that pokemon");
        return;
    }
    const pokemon = state.pokedex[pokemonName];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    pokemon.stats.forEach((stat) => {
        console.log(` -${stat.stat.name}: ${stat.base_stat}`);
    });
    console.log("Types:");
    pokemon.types.forEach((type) => {
        console.log(` - ${type.type.name}`);
    });
}
