import Notiflix from 'notiflix';
import { renderSingleCountry, renderCountries } from './index.js';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fileds=name,capital,population,flags,languages`
  )
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
