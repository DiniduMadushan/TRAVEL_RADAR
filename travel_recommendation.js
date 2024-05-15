const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

function clearSearch() {
    document.getElementById("searchKey").value = "";
}

clearBtn.addEventListener("click", clearSearch);

function searchCountries() {
    const searchTerm = document.getElementById('searchKey').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Fetch the JSON data
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries;
            console.log
            // Check if the search term is "countries"
            if (searchTerm === "countries") {
                // Iterate through all countries
                countries.forEach(country => {
                    const cities = country.cities.map(city => `
                        <div class="city-card">
                            <img src="${city.imageUrl}" alt="City Image">
                            <h2>${city.name}</h2>
                            <p>${city.description}</p>
                            <button>Visit</button>
                        </div>
                    `).join('');

                    resultDiv.innerHTML += `
                        <div class="country-card">
                            <h2>${country.name}</h2>
                            <div class="city-card-column">
                                ${cities}
                            </div>
                        </div>
                    `;
                });
            } else {
                resultDiv.innerHTML = 'No matching countries found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}


searchBtn.addEventListener("click", searchCountries);
