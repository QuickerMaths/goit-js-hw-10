import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404)
          Notiflix.Notify.failure('Oops, there is no country with that name');

        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific query!'
        );
      } else if (data.length === 1) {
        renderSingleCountry(data);
      } else {
        renderCountries(data);
      }
    })
    .catch(error => console.log(error));
}

function renderCountries(data) {
  const markup = data
    .map(country => {
      return `
        <li class="country-list__item">
          <img class="country-list__flag" src="${country.flags.svg}" alt="${country.flags.alt}" width="50" height="30">
          <p class="country-list__name">${country.name.official}</p>
        </li>
      `;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderSingleCountry(data) {
  const markup = data.map(country => {
    return `
    <li class="country-list__item">
      <img class="country-list__flag" src="${country.flags.svg}" alt="Flag of ${country.flags.alt}" width="50" height="30">
      <p class="country-list__name">${country.name.official}</p>
      <p class="country-list__capital">Capital: ${country.capital}</p>
      <p class="country-list__population">Population: ${country.population}</p>
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
