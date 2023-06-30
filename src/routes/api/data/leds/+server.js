import { db } from "$lib/db.secret";
import { json } from "@sveltejs/kit";

export const GET = async () => {
	const dico = await db.dicos.findOne();

	return json(dico?.leds || []);
};

export const PUT = async ({ request }) => {
	const body = await request.json();

	const results = await db.dicos.updateOne(
		{},
		{
			$set: { leds: body }
		}
	);

	return json(results);
};
