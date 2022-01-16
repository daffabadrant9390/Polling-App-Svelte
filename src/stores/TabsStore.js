import { writable } from "svelte/store";

const TabsStore = writable(["Current Polls", "Add New Poll"]);

export default TabsStore;
