import { forIn, identity, isObject, has } from 'lodash-es';

export function traverse(obj, iteratee = identity, base = []) {
	forIn(obj, (value, key) => {
		if (isObject(value)) {
			traverse(obj[key], iteratee, [...base, key]);
		} else {
			const path = [...base, key].join('.');
			iteratee(value, path);
		}
	});
}

export function dotNotation(obj) {
	const result = {};
	traverse(obj, (value, path) => {
		if (!has(result, path)) {
			result[path] = value;
		} else {
			throw new Error(
				`Found duplicate entry for "${path}" when trying to convert to dot notation: 
${JSON.stringify(obj, null, 2)}`
			);
		}
	});
	return result;
}
