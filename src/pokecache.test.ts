import { Cache } from "./pokecache";
import { test, expect } from "vitest";

test.concurrent.each([
    {
        key: "https://pokeapi.co/api/v2/location-area/1",
        val: "data",
        interval: 500,
    },
    {
        key: "https://pokeapi.co/api/v2/location-area/2",
        val: "moreData",
        interval: 1000,
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});
