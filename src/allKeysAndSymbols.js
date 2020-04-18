/**
 * Get all keys and symbols.
 *
 * @param {Object} object
 * @returns {[]}
 */
function allKeysAndSymbols(object) {
	if (object === null || object === undefined) {
		return [];
	}

	const result = [];

	let current = object;

	do {
		result.push(
			...Object.getOwnPropertyNames(current),
			...Object.getOwnPropertySymbols(current)
		);

		current = Object.getPrototypeOf(current);
	} while (current);

	return result;
}

module.exports = { allKeysAndSymbols };
