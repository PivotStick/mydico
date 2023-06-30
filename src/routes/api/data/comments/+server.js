import { db } from "$lib/db.secret";
import { json } from "@sveltejs/kit";

export const GET = async () => {
	const dico = await db.dicos.findOne();

	return json(dico?.comments || "");
};

export const PUT = async ({ request }) => {
	const body = await request.json();

	const results = await db.dicos.updateOne(
		{},
		{
			$set: { comments: body }
		}
	);

	return json(results);
};
