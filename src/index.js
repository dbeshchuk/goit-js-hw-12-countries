import '/sass/main.scss';
import '/js/fetchCountries.js';

import countriesTemplate from '/templates/countries-list.hbs';
import countryDescription from '/templates/country-description.hbs';

import { error, alert } from '@pnotify/core';
import debounce from 'lodash.debounce';


const countriesList = document.querySelector('.countries-container')
const countriesInput = document.querySelector('.countries-input')

function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      if (response.status == 404) {
        reject
      }
      
      return response.json();
    })
    .then(data => {
      console.log(data);
      
      if (data.length === 1) {
        countriesList.innerHTML = '';
        countriesList.insertAdjacentHTML('beforeend', countryDescription(data));
      } else if (data.length > 1 && data.length < 10) {
        countriesList.innerHTML = '';
        countriesList.insertAdjacentHTML('beforeend', countriesTemplate(data));
      } else if (data.length > 10) {
        countriesList.innerHTML = '';
        
        alert({
        delay: 5000,
        maxOpen: 1,
        icon: false,
        closer: false,
        sticker: false,
        addClass: 'pnotalert',
        text: "Too many matches found. Please enter a more specific query !",
      });

      }
    })
    .catch(() => {
      countriesList.innerHTML = '';

      error({
        delay: 5000,
        maxOpen: 1,
        icon: false,
        closer: false,
        sticker: false,
        addClass: 'pnotalert',
        text: "No matches found. Please enter a correct query !"
      });
    })
}

countriesInput.addEventListener('input', debounce(() => {
  fetchCountries(countriesInput.value)
}, 500))