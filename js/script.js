let search = document.getElementById("search");
let risultati = document.getElementById("risultati");
let home = document.getElementById("home");

home.onclick = function() {
	location.href = "index.html";
};

let works = [];

search.onclick = async function () {
	const genre = document.getElementById("genre").value;
	works = await fetchSubjects(genre);
	renderWorks();
}

function renderWorks() {
	// render tabella
	risultati.innerHTML = "";
	document.getElementById("instr").innerHTML = "You can click on the title of the book you are interested in if you want to read its description:";

	for (const work of works) {
		let row = document.createElement("tr");
		risultati.appendChild(row);
		let t = document.createElement("td");
		let a = document.createElement("td");
		let tdDescr = document.createElement("td");
		row.setAttribute("id", work.key)
		t.innerHTML = work.title;
		a.innerHTML = work.authors[0].name;
		tdDescr.innerHTML = work.description ? work.description : "";
		row.appendChild(t);
		row.appendChild(a);
		row.appendChild(tdDescr);
		addRowHandlers(row);
	}

	document.getElementById("loader").classList.add("hide_spin");
}

function refreshDescription(currentRow, info) {
	let cell = currentRow.getElementsByTagName("td")[2];
	cell.innerHTML = info;
}

function addRowHandlers(currentRow) {	
	currentRow.onclick = async () => {
		const key = currentRow.getAttribute("id");
		const work = works.find(w => w.key === key);
		if (!work) {
			return;
		}
		const descriptions = await fetchDescription(key);
		let info = descriptions.description;
		work.description = info;

		refreshDescription(currentRow, info);
	};
}

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