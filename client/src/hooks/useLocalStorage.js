import { useEffect, useState } from 'react';

// prefix for all localstorage items
const PREFIX = 'chatter-';

// custom hook to store state in localstorage, update when the state changes
// retrieves localstorage and parses for us
export default function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;

	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);

		if (jsonValue !== 'undefined' && jsonValue !== null) {
			return JSON.parse(jsonValue);
		}
		if (typeof initialValue === 'function') {
			return initialValue();
		} else {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);

	return [value, setValue];
}
