/**
 * Execute generator.
 *
 * @param { GeneratorFunction } generator
 */
function asyncExecutor(generator) {
	const generatorInstance = generator();

	function inner(next) {
		if (next.done) {
			return;
		}

		if (next.value instanceof Promise) {
			next.value
				.then(e => generatorInstance.next(e))
				.catch(e => generatorInstance.throw(e))
				.then(e => inner(e));
		} else {
			inner(generatorInstance.next());
		}
	}

	inner(generatorInstance.next())
}

module.exports = { asyncExecutor };
