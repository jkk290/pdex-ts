import { createInterface } from "node:readline";

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
        console.log(`Your command was: ${words[0]}`);
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
