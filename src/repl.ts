import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { commandExit } from "./command_exit";

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    rl.on("line", async (input) => {
        if (!input) {
            rl.prompt();
            return;
        }
        const words = cleanInput(input);
        const command = words[0];
        const commandsList = getCommands();
        if (commandsList[command]) {
            try {
                commandsList[command].callback(commandsList);
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
            }
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((word) => word != "");
}
