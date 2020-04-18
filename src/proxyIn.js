/**
 * Proxy in operation, to return true only for own properties.
 *
 * @param { Object } object
 * @returns {Proxy<Object>}
 */
function proxyIn(object) {
	return new Proxy(object, {
		has(target, name) {
			return target.hasOwnProperty(name);
		}
	});
}

module.exports = { proxyIn }
