import { db } from "$lib/db.secret";
import { json } from "@sveltejs/kit";

export const GET = async () => {
	const dico = await db.dicos.findOne();
	return json(dico?.dicos || []);
};
