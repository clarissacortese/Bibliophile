import "../css/style.css";
import logoFn from "../img/logo/logo.js";
import { fetchSubjects } from "./service";
import { fetchDescription } from "./service";

//logo con refresh

document.getElementById("logo").appendChild(logoFn());
let home = document.getElementById("home");

home.onclick = function() {
	location.href = "index.html";
};

// ricerca genere letterario

let search = document.getElementById("search");

let works = [];

search.onclick = async function () {
	const genre = document.getElementById("genre").value;
	works = await fetchSubjects(genre);
	renderWorks();
}

// render dei risultati

let risultati = document.getElementById("risultati");

function renderWorks() {
	risultati.innerHTML = "";
	document.getElementById("instructions").innerHTML = "You can click on the title of the book you are interested in if you want to read its description:";

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

// descrizione di un titolo

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