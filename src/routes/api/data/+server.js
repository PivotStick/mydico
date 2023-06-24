import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGO_URI);
const db = client.db("mydico");
const collection = db.collection("dicos");

export const GET = async () => {
	const dico = await collection.findOne();

	if (dico) {
		return json(dico);
	}

	const data = {
		updatedAt: Date.now()
	};

	const result = await collection.insertOne(data);

	return json({ _id: result.insertedId, ...data });
};

export const PUT = async ({ request }) => {
	const datas = await request.json();
	const _id = datas._id;
	delete datas._id;

	const payload = {
		...datas,
		updatedAt: Date.now()
	};

	await collection.updateOne({}, { $set: payload });

	return json({ _id, ...payload });
};
