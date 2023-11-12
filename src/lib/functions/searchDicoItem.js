/**
 * @param {string} query
 * @param {DataValues["dicos"]} dicos
 */
export function searchDicoItem(query, dicos) {
	/**
	 * @type {{ name: string; items: { name: string; type: string; }[] }[]}
	 */
	const results = [];

	query = query.trim().toLowerCase();

	dicos.forEach((dico) => {
		dico.items.forEach((item) => {
			if (item.name.trim().toLowerCase().includes(query)) {
				let rDico = results.find((rDico) => rDico.name === dico.name);

				if (!rDico) {
					rDico = {
						name: dico.name,
						items: []
					};
					results.push(rDico);
				}

				rDico.items.push({
					name: item.name,
					type: item.type
				});
			}
		});
	});

	return results;
}
