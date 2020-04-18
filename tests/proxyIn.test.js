const { expect } = require('chai');
const { describe, it } = require('mocha');

const { proxyIn } = require('../src/proxyIn');

describe('proxyIn', () => {
	it('should hide proto value', () => {
		const proto = { value: 42 };
		const object = Object.create(proto);

		const proxy = proxyIn(object);

		expect('value' in object).equal(true);
		expect('value' in proxy).equal(false);
	});

	it('shouldn\'t hide object value', () => {
		const object = {};
		Object.defineProperty(object, 'value', {
			value: 2020,
			writable: true,
			configurable: true,
			enumerable: false,
		});

		const proxy = proxyIn(object);

		expect('value' in object).equal(true);
		expect('value' in proxy).equal(true);
	});

	it('shouldn\'t hide object symbol', () => {
		const object = {};
		const symbol = Symbol('value');
		object[symbol] = 42;

		const proxy = proxyIn(object);

		expect(symbol in object).equal(true);
		expect(symbol in proxy).equal(true);
	});
});
