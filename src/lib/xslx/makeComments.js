import { utils } from "xlsx-js-style";

/**
 * @param {import("xlsx-js-style").WorkBook} wb
 * @param {DataValues} data
 */
export const makeComments = (wb, data) => {
	const displayComments = data.comments.display.split(/\n+/g);
	const faComments = data.comments.fa.split(/\n+/g);
	const s = { alignment: { horizontal: "left" } };

	const sheet = utils.aoa_to_sheet([
		["REMARQUES AFFICHAGES"],
		...Array(16)
			.fill(0)
			.map((_, i) => [{ v: displayComments[i] || "", s }]),
		["REMARQUES FILMS ANNONCES"],
		...Array(3)
			.fill(0)
			.map((_, i) => [{ v: faComments[i] || "", s }])
	]);

	sheet["!merges"] = [
		...Array(16)
			.fill(0)
			.map((_, i) => ({
				s: { c: 0, r: 1 + i },
				e: { c: 15, r: 1 + i }
			})),
		...Array(3)
			.fill(0)
			.map((_, i) => ({
				s: { c: 0, r: 18 + i },
				e: { c: 15, r: 18 + i }
			}))
	];

	utils.book_append_sheet(wb, sheet, "REMARQUES");
};
