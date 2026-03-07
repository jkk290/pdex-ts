import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    const commands = state.commands;
    console.log("\nWelcome to the Pokedex!");
    console.log("Usage: \n");
    for (const key in commands) {
        console.log(`${commands[key].name}: ${commands[key].description}`);
    }
    console.log();
}
