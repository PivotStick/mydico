import { db } from "$lib/db.secret.js";
import { json } from "@sveltejs/kit";

export const GET = async () => {
	const dico = await db.dicos.findOne();
	return json(dico?.posters || []);
};

export const PUT = async ({ request }) => {
	const posters = await request.json();
	const result = await db.dicos.updateOne({}, { $set: { posters } });

	return json(result);
};
