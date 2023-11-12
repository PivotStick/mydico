import { db } from "$lib/db.secret.js";
import { json } from "@sveltejs/kit";
import { v4 } from "uuid";

export const GET = async () => {
	const dico = await db.dicos.findOne();

	if (dico) {
		return json(dico);
	}

	/**
	 * @type {Omit<DataValues, "_id">}
	 */
	const data = {
		updatedAt: Date.now(),
		cinemaName: "MEGA CGR LATTES",
		circuit: "CGR",
		city: "MONTPELLIER",
		code: "70",
		weekNumber: "19",
		dicos: [],
		posters: [],
		leds: [
			{
				id: v4(),
				name: "panneaux LEDs isolés",
				subtitle: "Liste des films présents dans la rotation d'affiches fixes:",
				countInHall: 6,
				countInHallaway: 0,
				countOutside: 0,
				items: []
			},
			{
				id: v4(),
				name: "blocs 1 de 3 panneaux",
				subtitle: "Liste des films présents sur un des 3 panneaux du bloc (5 maximum):",
				countInHall: 2,
				countInHallaway: 0,
				countOutside: 0,
				items: []
			},
			{
				id: v4(),
				name: "blocs 2 de 3 panneaux",
				subtitle: "Liste des films présents sur un des 3 panneaux du bloc (5 maximum):",
				countInHall: 2,
				countInHallaway: 0,
				countOutside: 0,
				items: []
			},
			{
				id: v4(),
				name: "blocs 3 de 3 panneaux",
				subtitle: "Liste des films présents sur un des 3 panneaux du bloc (5 maximum):",
				countInHall: 0,
				countInHallaway: 0,
				countOutside: 0,
				items: []
			}
		],
		comments: {
			display: "",
			fa: ""
		},
		fa: []
	};

	const result = await db.dicos.insertOne(data);

	return json({ _id: result.insertedId, ...data });
};

/**
 * @type {import("@sveltejs/kit").RequestHandler}
 */
export const PUT = async ({ request }) => {
	const datas = await request.json();
	const _id = datas._id;
	delete datas._id;

	const payload = {
		...datas,
		updatedAt: Date.now()
	};

	await db.dicos.updateOne({}, { $set: payload });

	return json({ _id, ...payload });
};
