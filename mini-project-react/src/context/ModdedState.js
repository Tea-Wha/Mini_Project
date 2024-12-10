import {useEffect, useState} from "react";

export const useSyncedState = (key, defaultValue) => {
	const [state, setState] = useState(() => {
		const savedValue = localStorage.getItem(key);
		return savedValue ? JSON.parse(savedValue) : defaultValue;
	});
	
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [state, key]);
	
	return [state, setState];
};