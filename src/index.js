import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const ref = {
    inputText: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

const searchQuery = '';
let countriesAmount = 0;

ref.inputText.addEventListener('input', debounce(inputFetch, DEBOUNCE_DELAY));

function inputFetch() {
    console.log(`ref.inputText`, ref.inputText.value);
    searchQuery = ref.inputText.value.trim();
    fetchCountries(searchQuery).then(countries => countries.map((country) => {
        console.log(country);
        countriesAmount += 1;
        addMarkup(country, countriesAmount);
    }));   
};

function addMarkup(country) {
    const { name, capital, population, flags, languages } = country;
    const liMarkup = `
        <li class="country_item">
            <p><span>${flags}</span>${name}</p>
        </li>
    `;

    const infoMarkap = `
        <h1><span>${flags}</span>${name}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${languages}</p>
    `;

    if (searchQuery = '') {
        ref.countryList.innerHTML = "";
        ref.countryInfo.innerHTML = "";
    } else if (countriesAmount > 2 && countriesAmount < 10) {
        ref.countryList.insertAdjacentHTML('beforeend', liMarkup);
    } else {
        ref.countryInfo.insertAdjacentHTML('beforeend', infoMarkap);
    }

}


//  const { name: { official }, flags: { svg }, capital, population, languages } = country[0];
//     const language = Object.values(languages).join(", ");