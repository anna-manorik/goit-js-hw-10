import Notiflix from 'notiflix';

export default fetchCountries;

const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");

function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok){
            Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
    })
    .then(country => {
        if(country.length > 10){
            countryList.innerHTML = "";
            countryInfo.innerHTML = "";
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } else if(country.length === 1){
            showCountryInfo(country);
        } else if(country.length > 2 && country.length <= 10){
            showCountryList(country);
        } else {
            countryList.innerHTML = "";
            countryInfo.innerHTML = "";
        }
    })
    .catch(error => console.log(error));
}

function showCountryInfo(country){
    countryList.innerHTML = "";

    country.map(item => {
        countryInfo.innerHTML = `<img src=${item.flags.svg} width=50/>
        <b><span style="font-size: 40px">${item.name.official}</span></b><br />
        <b>Capital:</b> ${item.capital}<br />
        <b>Population:</b> ${item.population}<br />
        <b>Languages:</b> ${Object.values(item.languages)}`
    });
}

function showCountryList(country){
    countryInfo.innerHTML = "";

    country.map(item => {
        countryList.insertAdjacentHTML("beforeend", `<img src=${item.flags.svg} width=50/>
        <span>${item.name.common}</span><br >`)
    });
}