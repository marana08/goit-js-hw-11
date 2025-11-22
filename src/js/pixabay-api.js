import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "53360876-f97dd2c70b0e27b498deb3edc";

export async function getImagesByQuery(query){
    const params = {
        key: API_KEY,
        q: query,
        image_tнpe: "photo",
        orientation: "horizontal",
        safesearch: true,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
}