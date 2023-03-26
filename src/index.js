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

let searchQuery = '';
let countriesAmount = 0;

ref.inputText.addEventListener('input',
    debounce(() => {
       console.log(`ref.inputText`, ref.inputText.value);
        searchQuery = ref.inputText.value.trim();
        if (searchQuery !== '') {
            fetchCountries(searchQuery).then(countries => {
                console.log(`countries.length`, countries.length);
                console.log(`countries`, countries);
                if (countries.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                } else if (countries.length === 0) {
                    Notiflix.Notify.info("Oops, there is no country with that name");
                } else if (countries.length === 1) {
                    infoMarkap(countries);
                } else if (countries.length >= 2 && countries.length <= 10) {
                    liMarkup(countries);
                }
            })
        }    
    }, DEBOUNCE_DELAY)
);

    // const language = Object.values(languages).join(",");

function liMarkup(countries) {
    const markup = countries.map(({ name: { official }, flags: { svg } }) => {
       
        return `<li class="country_item">
            <img src="${svg}" alt="Flag of ${official}"
                 width="30" high="20">
            <p class ="flag">${official}</p>
        </li>`;
    })
    .join('');
    ref.countryList.innerHTML = markup;
};

function infoMarkap(countries) {
    const markup = countries.map(({ name: { official }, flags: { svg }, capital, population, languages }) => {
        const language = Object.values(languages).join(", ");
        return `<p><img src="${svg}" alt="Flag of ${official}" 
                width="30" high="20">
                <b>${official}</b></p>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${language}</p>`
    })
    .join('');
    ref.countryInfo.innerHTML = markup;       
};