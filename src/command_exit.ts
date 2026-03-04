import { State } from "./state";

export function commandExit(state: State): void {
    console.log("Closing the Pokedex... Goodbye!\n");
    state.rl.close();
    process.exit(0);
}
