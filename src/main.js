
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,

} from "./js/render-functions";

const form = document.querySelector(".form");
const input = document.querySelector("input[name='search-text']");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            timeout: 2000,
        });
        return;
    }

    clearGallery();
    showLoader();

    try {
        const data = await getImagesByQuery(query);

        if (!data.hits || data.hits.length === 0) {
            iziToast.error({
                title: "No results",
                message: "Sorry, there are no images matching your search query. Please try again!",
            });
            return;
        }
        createGallery(data.hits);
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong! Try again later.",
        });
    } finally {
        hideLoader();
        form.reset();
    }
});
