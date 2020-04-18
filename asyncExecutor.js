/**
 * Execute generator
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

// тесты
const ID = 43;
const delayMS = 1000;

function getId() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(32);
		}, delayMS);
	});
}

function getDataById(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			id === ID ? resolve('🍎') : reject('💥');
		}, delayMS);
	});
}

asyncExecutor(function* () {
	console.time('Time');

	try {
		const id = yield getId();
		console.log('Id', id);
		const data = yield getDataById(id);
		console.log('Data', data);
	} catch {

	}
	console.timeEnd('Time');

	const id = yield getId();
	console.log('Id', id);
});
