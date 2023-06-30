/**
 * @param {import("xlsx-js-style").WorkBook} wb
 */
export const setDefaultStyle = (wb) => {
	wb.SheetNames.forEach((sheetName) => {
		for (const key in wb.Sheets[sheetName]) {
			if (key.startsWith("!")) continue;

			const cell = wb.Sheets[sheetName][key];

			cell.s = {
				...(cell.s || {}),
				font: {
					name: "Arial",
					sz: 12,
					...(cell.s?.font || {})
				}
			};
		}
	});
};
