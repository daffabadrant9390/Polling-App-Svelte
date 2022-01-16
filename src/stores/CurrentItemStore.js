import { writable } from "svelte/store";

const CurrentItemStore = writable("Current Polls");

export default CurrentItemStore;
