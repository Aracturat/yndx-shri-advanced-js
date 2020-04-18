const { expect } = require('chai');
const { describe, it } = require('mocha');

const { asyncExecutor } = require('../src/asyncExecutor');

const getFunctions = (ID, delayMS = 500) => {
	function getId() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(ID);
			}, delayMS);
		});
	}

	function getDataById(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				id === ID ? resolve('ok') : reject('error');
			}, delayMS);
		});
	}

	return {
		getId,
		getDataById
	}
}


describe('asyncExecutor', () => {
	it('execute generator', (done) => {
		const ID = 43;

		const { getId, getDataById } = getFunctions(ID);

		asyncExecutor(function* () {
			const id = yield getId();
			const data = yield getDataById(id);

			expect(id).equals(ID);
			expect(data).equals('ok');

			done();
		});
	});

	it('execute generator with errors', (done) => {
		const ID = 43;

		const { getId, getDataById } = getFunctions(ID);

		asyncExecutor(function* () {
			try {
				const data = yield getDataById(ID + 1);

				expect(data).equals('this line is not executed');
			} catch (err) {
				expect(err).equals('error');
			}

			const id = yield getId();
			expect(id).equals(ID);

			done();
		});
	});

});
