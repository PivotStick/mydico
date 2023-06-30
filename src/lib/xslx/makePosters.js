import { utils } from "xlsx-js-style";

/**
 * @param {import("xlsx-js-style").WorkBook} wb
 * @param {DataValues} data
 */
export const makePosters = (wb, data) => {
	const b = { style: "thin", color: { auto: 1 } };
	const border = { top: b, left: b, bottom: b, right: b };

	const makeHead = (text = "") => ({
		v: text,
		s: {
			border,
			font: {
				bold: true
			},
			alignment: {
				vertical: "center",
				horizontal: "center"
			}
		}
	});

	const head = [
		makeHead("SEMAINE"),
		makeHead("CODE ENQ."),
		makeHead("VILLE"),
		makeHead("CIRCUIT"),
		makeHead("COMPLEXE"),
		makeHead("AFFICHE FILM"),
		makeHead("POSITIONNEMENT"),
		makeHead("FORMAT")
	];

	/**
	 * @type {((poster: DataValues["posters"][number]) => string)[]}
	 */
	const mapper = [
		() => data.weekNumber,
		() => data.code,
		() => data.city,
		() => data.circuit,
		() => data.cinemaName,
		(poster) => poster.name,
		(poster) => poster.location,
		(poster) => poster.format
	];

	const aoa = [
		head,
		...data.posters.map((poster) =>
			head.map((_, i) => ({
				v: mapper[i](poster).toUpperCase(),
				s: {
					border,
					alignment: {
						vertical: "center",
						horizontal: i === 5 ? "left" : "center"
					}
				}
			}))
		)
	];
	const sheet = utils.aoa_to_sheet(aoa);

	sheet["!cols"] = [
		{ wpx: 95 },
		{ wpx: 95 },
		{ wpx: 120 },
		{ wpx: 100 },
		{ wpx: 150 },
		{ wpx: Math.max(head[5].v.length, ...data.posters.map((p) => p.name.length)) * 10 },
		{ wpx: 175 },
		{ wpx: 150 }
	];

	sheet["!rows"] = aoa.map(() => ({ hpx: 30 }));

	utils.book_append_sheet(wb, sheet, "AFFICHES");
};
