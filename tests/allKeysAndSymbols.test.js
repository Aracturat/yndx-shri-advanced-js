const { expect } = require('chai');
const { describe, it } = require('mocha');

const { allKeysAndSymbols } = require('../src/allKeysAndSymbols');

describe('allKeysAndSymbols', () => {
	it('should find all keys for empty object', () => {
		const object = {};

		const result = allKeysAndSymbols(object);

		expect(result).eql([
			'constructor',
			'__defineGetter__',
			'__defineSetter__',
			'hasOwnProperty',
			'__lookupGetter__',
			'__lookupSetter__',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toString',
			'valueOf',
			'__proto__',
			'toLocaleString'
		]);
	});

	it('should find all keys for object with keys', () => {
		const object = { key: 'value' };

		const result = allKeysAndSymbols(object);

		expect(result).eql([
			'key',
			'constructor',
			'__defineGetter__',
			'__defineSetter__',
			'hasOwnProperty',
			'__lookupGetter__',
			'__lookupSetter__',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toString',
			'valueOf',
			'__proto__',
			'toLocaleString'
		]);
	});

	it('should find symbols for object with symbols', () => {
		const object = { key: 'value' };
		const symbol = Symbol('symbol');
		object[symbol] = 42;

		const result = allKeysAndSymbols(object);

		expect(result).eql([
			'key',
			symbol,
			'constructor',
			'__defineGetter__',
			'__defineSetter__',
			'hasOwnProperty',
			'__lookupGetter__',
			'__lookupSetter__',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toString',
			'valueOf',
			'__proto__',
			'toLocaleString'
		]);
	});

	it('should find all keys from prototype', () => {
		const proto = { protoKey: 'value' };
		const object = Object.create(proto);
		object.key = 'value';

		const result = allKeysAndSymbols(object);

		expect(result).eql([
			'key',
			'protoKey',
			'constructor',
			'__defineGetter__',
			'__defineSetter__',
			'hasOwnProperty',
			'__lookupGetter__',
			'__lookupSetter__',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toString',
			'valueOf',
			'__proto__',
			'toLocaleString'
		]);
	});
});
