import { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    Object.entries(state.pokedex).forEach((entry) => {
        console.log(` - ${entry[1].name}`);
    });
}
