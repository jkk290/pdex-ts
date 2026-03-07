import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    let locations: ShallowLocations;
    if (state.nextLocationsURL) {
        locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    } else {
        locations = await state.pokeApi.fetchLocations();
    }
    state.nextLocationsURL = locations.next;
    if (locations.previous) {
        state.prevLocationsURL = locations.previous;
    }
    for (const index in locations.results) {
        console.log(`${locations.results[index].name}`);
    }
}

export async function commandMapb(state: State): Promise<void> {
    let locations: ShallowLocations;
    if (!state.prevLocationsURL) {
        console.log("You're on the first page");
        return;
    }
    locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
    if (locations.next) {
        state.nextLocationsURL = locations.next;
    }
    if (locations.previous) {
        state.prevLocationsURL = locations.previous;
    } else {
        state.prevLocationsURL = "";
    }
    for (const index in locations.results) {
        console.log(`${locations.results[index].name}`);
    }
}
