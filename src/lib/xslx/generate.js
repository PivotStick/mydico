import { makeLeds } from "./makeLeds";
import { utils, writeFile } from "xlsx-js-style";
import { setDefaultStyle } from "./setDefaultStyle";
import { makeComments } from "./makeComments";
import { makeFa } from "./makeFa";
import { makePosters } from "./makePosters";

/**
 * @param {DataValues} values
 */
export const generate = (values) => {
	const wb = utils.book_new();

	makePosters(wb, values);
	makeFa(wb, values);
	makeLeds(wb, values);
	makeComments(wb, values);

	setDefaultStyle(wb);

	const name = values.cinemaName.toUpperCase();
	const week = values.weekNumber.toUpperCase();

	writeFile(wb, `${name} SEMAINE ${week}.xlsx`.replace(/\s+/g, "_"));
};
