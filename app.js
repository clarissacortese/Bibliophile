// Purpose: This file contains the JavaScript code for the Open Library API project.

// Function to get subjects based on genre
const getSubjects = async (genre) => {
    let url = `https://openlibrary.org/subjects/${genre.toLowerCase()}.json`;
    try {
        // Use fetch API to get data
        const resp = await fetch(url);
        // Convert response to JSON
        const data = await resp.json();
        console.log(data.works);
        return data.works;
    } catch (err) {
        // Throw error if request fails
        throw new Error(`Request Failed: ${err.message}`);
    }
};

// Function to get description based on key
const getDescription = async (key) => {
    let url = `https://openlibrary.org${key}.json`;
    try {
        // Use fetch API to get data
        const resp = await fetch(url);
        // Convert response to JSON
        const data = await resp.json();
        return data;
    } catch (err) {
        // Throw error if request fails
        throw new Error(`Request Failed: ${err.message}`);
    }
};

// Add logo with refresh functionality
let logo = document.getElementById("logo");

logo.onclick = function() {
    location.href = "index.html";
};

// Search for a literary genre
let search = document.getElementById("search");
let works = [];

// When the search button is clicked, get the genre from the input field,
// fetch the subjects for that genre, and render the works
search.onclick = async function () {
    const genre = document.getElementById("genre").value;
    // Check if the input field is empty
    if (!genre.trim()) {
        // Show an alert or some other kind of message
        alert("Please enter a genre");
        return;
    }
    document.getElementById("loader").classList.remove("hide_spin");
    works = await getSubjects(genre);
    // Show the table
    document.getElementById("table").style.display = "table";
    renderWorks();
}

// Render the results
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
        t.innerHTML = work.title || "Sorry, we can't find the title.";
        a.innerHTML = (work.authors && work.authors[0] && work.authors[0].name) || "Sorry, we can't find the author";
        tdDescr.innerHTML = work.description || "";
        row.appendChild(t);
        row.appendChild(a);
        row.appendChild(tdDescr);
        addRowHandlers(row);
    }

    document.getElementById("loader").classList.add("hide_spin");
}

// Update the description of a title
function refreshDescription(currentRow, info) {
    let cell = currentRow.getElementsByTagName("td")[2];
    cell.innerHTML = info;
}

// Add click handlers to each row. When a row is clicked, fetch the description for that work and update the row
function addRowHandlers(currentRow) {    
    currentRow.onclick = async () => {
        const key = currentRow.getAttribute("id");
        const work = works.find(w => w.key === key);
        if (!work) {
            return;
        }
        const descriptions = await getDescription(key);
        let info = descriptions.description || "Sorry, it seems that there is no description for this book.";
        work.description = info;

        refreshDescription(currentRow, info);
    };
}