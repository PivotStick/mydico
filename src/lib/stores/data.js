import { api } from "$lib/api";
import { get, writable } from "svelte/store";

const key = "____DATAS________";
/**
 * @type {{
 * 	syncing: boolean;
 * 	values: DataValues;
 * }}
 */
const defaultValues = {
	syncing: false,
	// @ts-ignore
	values: {}
};

const getInitialValue = () => {
	const value = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValues));
	value.syncing = false;

	return value;
};

const makeData = () => {
	/**
	 * @type {import("svelte/store").Writable<typeof defaultValues>}
	 */
	const { subscribe, update, set } = writable(getInitialValue());

	const sync = async () => {
		if (get({ subscribe }).syncing) {
			throw new Error("Already syncing");
		}

		update((v) => {
			v.syncing = true;
			return v;
		});

		const values = await api.get("/data");

		update((v) => {
			v.syncing = false;
			v.values = values;
			return v;
		});
	};

	const save = async () => {
		const current = get({ subscribe });
		if (current.syncing) {
			throw new Error("Already syncing");
		}

		update((v) => {
			v.syncing = true;
			return v;
		});

		const values = await api.put("/data", current.values);

		update((v) => {
			v.syncing = false;
			v.values = values;
			return v;
		});
	};

	if (localStorage.getItem(key) === null) {
		sync();
	}

	subscribe((data) => localStorage.setItem(key, JSON.stringify(data)));

	return { subscribe, set, sync, save };
};

export const data = makeData();
