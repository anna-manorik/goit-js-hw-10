import './css/styles.css';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const countryInput = document.getElementById("search-box");
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");

countryInput.addEventListener("input", _.debounce(evt => {
    if(countryInput.value.trim() === ""){
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }

    fetchCountries(countryInput.value);
}, DEBOUNCE_DELAY));
