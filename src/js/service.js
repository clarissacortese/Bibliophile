import axios from 'axios';

async function fetchSubjects(genre) {
	document.getElementById("loader").classList.remove("hide_spin");
	let url = `https://openlibrary.org/subjects/${genre.toLowerCase()}.json`;
	try {
		const response = await fetch(url);
		const json = await response.json();
		return json.works;
	} catch (err) {
		throw new Error(`Request Failed: ${err.message}`);
	}
}

async function fetchDescription(key) {
	let url = `https://openlibrary.org${key}.json`;
		try {
		let response = await fetch(url);
		return await response.json();
	} catch (err) {
		throw new Error(`Request Failed: ${err.message}`);
	};
}

export {fetchSubjects};
export {fetchDescription};