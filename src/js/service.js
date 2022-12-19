import axios from "axios";

const getSubjects = async (genre) => {
    let url = `https://openlibrary.org/subjects/${genre.toLowerCase()}.json`;
    try {
        const resp = await axios.get(url);
        console.log(resp.data.works);
        return resp.data.works;
    } catch (err) {
        throw new Error(`Request Failed: ${err.message}`);
    }
};

const getDescription = async (key) => {
    let url = `https://openlibrary.org${key}.json`;
    try {
        const resp = await axios.get(url);
        return resp.data;
    } catch (err) {
        throw new Error(`Request Failed: ${err.message}`);
    }
};

export {getSubjects};
export {getDescription};