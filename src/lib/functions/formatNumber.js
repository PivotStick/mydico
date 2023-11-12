const formatter = new Intl.NumberFormat(navigator.language, {});

/**
 * @param {any} value
 */
export function formatNumber(value) {
	return formatter.format(value);
}
