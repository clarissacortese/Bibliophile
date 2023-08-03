import "../css/style.css";
import logoFn from "../imgs/logo/logo.js";
import { getSubjects } from "./service";
import { getDescription } from "./service";
import _ from "lodash";

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
	document.getElementById("loader").classList.remove("hide_spin");
	const genre = document.getElementById("genre").value;
	works = await getSubjects(genre);
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
		t.innerHTML = _.get(work, "title", "Sorry, we can't find the title.");
		a.innerHTML = _.get(work, "authors[0].name", "Sorry, we can't find the author");
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
		const descriptions = await getDescription(key);
		let info = _.get(descriptions, "description", "Sorry, it seems that there is no description for this book.");
		work.description = info;

		refreshDescription(currentRow, info);
	};
}