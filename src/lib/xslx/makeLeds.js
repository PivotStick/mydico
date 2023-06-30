import { utils } from "xlsx-js-style";

/**
 * @param  {...("top" | "left" | "bottom" | "right")} sides
 */
const borders = (...sides) => ({
	border: sides.reduce((a, side) => {
		a[side] = { style: "medium", color: { theme: 1 } };
		return a;
	}, /** @type {any} */ ({}))
});

/**
 *
 * @param {DataValues["leds"][number]} led
 */
const makeLed = (led, limit = 0) => {
	const items = led.items.length ? led.items : [{ name: "pas de film annonce" }];

	return [
		[
			{
				v: led.name,
				s: {
					font: { bold: true },
					...borders("top", "left")
				}
			},
			{ v: "nombre dans le hall", s: borders("top") },
			{
				v: led.countInHall || "-",
				s: borders("top", "right")
			}
		],
		[
			{ v: "", s: borders("left") },
			{
				v: "nombre dans les couloirs"
			},
			{
				v: led.countInHallaway || "-",
				s: borders("right")
			}
		],
		[
			{
				v: led.subtitle,
				s: {
					font: { italic: true },
					...borders("left")
				}
			},
			{
				v: "nombre en exterieur",
				s: borders("bottom")
			},
			{
				v: led.countOutside || "-",
				s: borders("bottom", "right")
			}
		],
		...Array(limit)
			.fill(undefined)
			.map((_, index, a) => {
				/**
				 * @type {Parameters<typeof borders>}
				 */
				const sides = ["left", "right"];

				if (index === a.length - 1) {
					sides.push("bottom");
				}

				const v = items[index]?.name || "";
				const s = borders(...sides);
				const b = { style: v ? "thin" : "hair", color: { theme: 1 } };

				return [
					{
						v: v.toUpperCase(),
						s: {
							border: {
								top: b,
								bottom: b,
								...s.border
							}
						}
					}
				];
			})
	];
};

/**
 * @param {import("xlsx-js-style").WorkBook} wb
 * @param {DataValues} data
 */
export const makeLeds = (wb, data) => {
	const sheet = utils.aoa_to_sheet(makeLed(data.leds[0], data.leds[0].items.length));

	utils.sheet_add_aoa(sheet, makeLed(data.leds[1], 5), { origin: "E1" });
	utils.sheet_add_aoa(sheet, makeLed(data.leds[2], 5), { origin: "E10" });
	utils.sheet_add_aoa(sheet, makeLed(data.leds[3], 5), { origin: "E19" });

	// @ts-ignore
	sheet["!cols"] = [
		{ wpx: 438 },
		{ wpx: 168 },
		{ wpx: 58 },
		,
		{ wpx: 438 },
		{ wpx: 168 },
		{ wpx: 58 }
	];

	utils.book_append_sheet(wb, sheet, "LED");
};
