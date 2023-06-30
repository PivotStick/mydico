import { utils } from "xlsx-js-style";

/**
 * @param {import("xlsx-js-style").WorkBook} wb
 * @param {DataValues} data
 */
export const makeComments = (wb, data) => {
	const sheet = utils.aoa_to_sheet([
		[
			{
				v: data.comments,
				s: {
					wrapText: true,
					alignment: {
						vertical: "top"
					}
				}
			}
		]
	]);

	sheet["!merges"] = [
		{
			s: { c: 0, r: 0 },
			e: { c: 10, r: 20 }
		}
	];

	utils.book_append_sheet(wb, sheet, "REMARQUES");
};
