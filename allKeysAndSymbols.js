function allKeysAndSymbols(object) {
	if (object === null || object === undefined) {
		return;
	}

	const result = [];

	let current = object;

	do {
		result.push(
			...Object.getOwnPropertyNames(current).map(e => e.toString()),
			...Object.getOwnPropertySymbols(current).map(e => e.toString())
		);

		current = Object.getPrototypeOf(current);
	} while (current);

	return result;
}


console.log(allKeysAndSymbols({})); // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ... ]

const object1 = {};
const a = Symbol("a");
const b = Symbol.for("b");

object1[a] = "localSymbol";
object1[b] = "globalSymbol";

console.log(allKeysAndSymbols(object1));

console.log(allKeysAndSymbols([]));
