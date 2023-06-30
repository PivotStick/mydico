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

const makeData = () => {
	/**
	 * @type {import("svelte/store").Writable<typeof defaultValues>}
	 */
	const { subscribe, update, set } = writable(
		JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValues))
	);

	const sync = async () => {
		if (get({ subscribe }).syncing) {
			throw new Error("Already syncing");
		}

		update((v) => {
			v.syncing = true;
			return v;
		});

		const values = await fetch("/api/data").then((res) => res.json());

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

		const values = await fetch("/api/data", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(current.values)
		}).then((res) => res.json());

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
