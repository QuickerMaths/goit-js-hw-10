import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

export function renderCountries(data) {
  const markup = data
    .map(country => {
      return `
            <li class="country-list__item">
              <div class="country-list__main-content">
                <img class="country-list__flag" src="${country.flags.svg}" alt="${country.flags.alt}" width="50" height="30">
                <p class="country-list__name">${country.name.official}</p>
              </div>
            </li>
          `;
    })
    .join('');
  countryList.innerHTML = markup;
}

export function renderSingleCountry(data) {
  const markup = data.map(country => {
    return `
        <li class="country-list__item">
          <div class="country-list__main-content">
            <img class="country-list__flag" src="${
              country.flags.svg
            }" alt="Flag of ${country.flags.alt}" width="50" height="30">
            <p class="country-list__name">${country.name.official}</p>
          </div>
          <div class=""country-list__additional-content">
            <p class="country-list__capital"><span class="country-list__span">Capital:</span> ${
              country.capital
            }</p>
            <p class="country-list__population"><span class="country-list__span">Population:</span> ${
              country.population
            }</p>
            <p class="country-list__languages"><span class="country-list__span">Languages:</span> ${Object.values(
              country.languages
            )}</p>
          </div>
        </li>  
        `;
  });
  countryList.innerHTML = markup;
}

input.addEventListener(
  'input',
  debounce(() => {
    const name = input.value.trim();
    if (name) {
      fetchCountries(name);
    } else {
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);
