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
            const beaches = data.beaches;
            const temples = data.temples;

            // Check if the search term is "countries"
            if (searchTerm === "countries" || searchTerm === "country") {
                // Iterate through all countries
                countries.forEach(country => {
                    const cities = country.cities.map(city => `
                        <div class="result-card">
                            <img src="${city.imageUrl}" alt="City Image">
                            <h2>${city.name}</h2>
                            <p>${city.description}</p>
                            <button>Visit</button>
                        </div>
                        
                    `).join('');

                    resultDiv.innerHTML += cities;
                });

                // Check if the search term is "beaches"

            } else if (searchTerm === "beaches" || searchTerm === "beach") {
                const beachCards = beaches.map(beach => `
                <div class="result-card">
                    <img src="${beach.imageUrl}" alt="${beach.name}">
                    <h2>${beach.name}</h2>
                    <p>${beach.description}</p>
                    <button>Visit</button>
                </div>
            `).join('');

                resultDiv.innerHTML += beachCards;

                // Check if the search term is "temples"

            } else if(searchTerm === "temples" || searchTerm === "temple"){
                const templeCards = temples.map(temple => `
                <div class="result-card">
                    <img src="${temple.imageUrl}" alt="${temple.name}">
                    <h2>${temple.name}</h2>
                    <p>${temple.description}</p>
                    <button>Visit</button>
                </div>
            `).join('');

                resultDiv.innerHTML += templeCards;

            } else {
                resultDiv.innerHTML = `<p id="searchStatus">no result found..try keywords("countries","beaches","temples")</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}


searchBtn.addEventListener("click", searchCountries);
