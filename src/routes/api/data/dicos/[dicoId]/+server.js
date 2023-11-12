import { db } from "$lib/db.secret";
import { error, json } from "@sveltejs/kit";

/**
 * @type {import("./$types").RequestHandler}
 */
export const PUT = async ({ request, params }) => {
	const payload = await request.json();
	const dico = await db.dicos.findOne({});

	if (!dico) {
		throw error(404, "No dico found");
	}

	const dicoIndex = dico.dicos.findIndex((d) => d.id === params.dicoId);

	/**
	 * @type {import("mongodb").UpdateFilter<DataValues>}
	 */
	const update = {};

	if (dicoIndex > -1) {
		update.$set = {
			[`dicos.${dicoIndex}`]: payload
		};
	} else {
		update.$push = { dicos: payload };
	}

	const result = await db.dicos.updateOne({}, update);

	return json(result);
};
