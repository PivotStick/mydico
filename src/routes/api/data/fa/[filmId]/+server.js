import { db } from "$lib/db.secret.js";
import { error, json } from "@sveltejs/kit";

export const PUT = async ({ request, params }) => {
	const body = await request.json();
	const dico = await db.dicos.findOne({});

	if (!dico) throw error(404, "No dico found");

	const faIndex = dico.fa.findIndex((fa) => fa.id === params.filmId);

	/**
	 * @type {import("mongodb").UpdateFilter<DataValues>}
	 */
	const update = {};

	if (faIndex > -1) {
		update.$set = {
			[`fa.${faIndex}`]: body
		};
	} else {
		update.$push = { fa: body };
	}

	const result = await db.dicos.updateOne({}, update);

	return json(result);
};
