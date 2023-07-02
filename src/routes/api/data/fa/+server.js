import { db } from "$lib/db.secret";
import { error, json } from "@sveltejs/kit";

export const GET = async () => {
	const dico = await db.dicos.findOne();

	if (!dico) throw error(404, "Dico not found");

	return json(dico.fa);
};
