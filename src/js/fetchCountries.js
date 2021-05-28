export default function fetchCountries(searchQuery) {
  return new Promise((resolve, reject) => {
    fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
      .then(response => {
        if (response.status == 404) {
          reject(new Error);
        }
      
      resolve(response.json());
    })
  })
}