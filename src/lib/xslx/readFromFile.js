import { v4 } from "uuid";
import { read, utils } from "xlsx-js-style";

const key = "TITRE FRANCAIS";

/**
 * @param {File} file
 */
export async function readFromFile(file) {
	const buffer = await file.arrayBuffer();
	const book = read(buffer);

	const films = utils.sheet_to_json(book.Sheets[book.SheetNames[0]]);

	return films.map((film) => ({
		id: v4(),
		name: String(film[key]),
		type: "fa"
	}));
}
