import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

class Db {
	constructor() {
		const client = new MongoClient(env.MONGO_URI);
		const db = client.db(`mydico${import.meta.env.PROD ? "" : "_dev"}`);

		/**
		 * @type {import("mongodb").Collection<Omit<DataValues, "_id">>}
		 */
		this.dicos = db.collection("dicos");
	}
}

export const db = new Db();
