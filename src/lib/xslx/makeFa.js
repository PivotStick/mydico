import { DateTime } from "luxon";
import { utils } from "xlsx-js-style";

/**
 * @param {import("xlsx-js-style").WorkBook} wb
 * @param {DataValues} data
 */
export const makeFa = (wb, data) => {
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

	/**
	 * @type {*[]}
	 */
	const head = [
		makeHead("N°SEMAINE"),
		makeHead("CODE ENQ."),
		makeHead("VILLE"),
		makeHead("CIRCUIT"),
		makeHead("COMPLEXE"),
		makeHead("N° DE SALLE"),
		makeHead("SEANCE/FILM"),
		makeHead("2D/3D"),
		makeHead("AVANT SEANCE"),
		makeHead("CONTENU"),
		makeHead("ORDRE"),
		makeHead("DUREE AVANT SEANCE"),
		makeHead("DATE"),
		makeHead("HORAIRE")
	];

	const rows = [head];
	const alignment = {
		vertical: "center",
		horizontal: "center"
	};

	const sorted = [...data.fa].sort(
		(a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
	);

	sorted.forEach((fa) => {
		fa.notes.forEach((note, i) => {
			let type = note.type.toUpperCase();
			const suffix = note?.mode?.value.toUpperCase();

			if (note.mode && suffix !== type) {
				type += ` ${suffix}`;
			}

			const start = DateTime.fromISO(fa.start);
			const [endHour, endMinute] = fa.end.split(":").map(Number);
			const duration = start.set({ hour: endHour, minute: endMinute }).diff(start);

			rows.push([
				{ s: { border, alignment }, v: data.weekNumber },
				{ s: { border, alignment }, v: data.code },
				{ s: { border, alignment }, v: data.city.toUpperCase() },
				{ s: { border, alignment }, v: data.circuit.toUpperCase() },
				{ s: { border, alignment }, v: data.cinemaName.toUpperCase() },
				{ s: { border, alignment }, v: fa.room },
				{ s: { border, alignment: { vertical: "center" } }, v: fa.name.toUpperCase() },
				{ s: { border, alignment }, v: fa.type },
				{ s: { border, alignment: { vertical: "center" } }, v: note.name.toUpperCase() },
				{ s: { border, alignment }, v: type },
				{ s: { border, alignment }, v: i + 1 },
				{ s: { border, alignment }, v: duration.toFormat("m") },
				{ s: { border, alignment }, v: start.toFormat("LL/dd/yyyy") },
				{ s: { border, alignment }, v: start.toFormat("H'H'mm") }
			]);
		});
	});

	const sheet = utils.aoa_to_sheet(rows);

	sheet["!cols"] = [
		{ wpx: 95 },
		{ wpx: 95 },
		{ wpx: 120 },
		{ wpx: 100 },
		{ wpx: 150 },
		{ wpx: 120 },
		{ wpx: 130 },
		{ wpx: 75 },
		{ wpx: 260 },
		{ wpx: 90 },
		{ wpx: 65 },
		{ wpx: 165 },
		{ wpx: 80 }
	];

	sheet["!rows"] = rows.map(() => ({ hpx: 30 }));

	utils.book_append_sheet(wb, sheet, "FA");
};
