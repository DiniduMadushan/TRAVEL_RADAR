const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

function clearSearch() {
    document.getElementById("searchKey").value = "";
}

clearBtn.addEventListener("click", clearSearch);

function searchCondition() {
    const input = document.getElementById('searchKey').value.toLowerCase();
    console.log(input);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);

            if (country) {
                resultDiv.innerHTML += `<h2>${country.name}</h2>`;
                resultDiv.innerHTML += `<img src="${country.imageUrl}" alt="${country.name}">`;
                resultDiv.innerHTML += `<p>${country.description}</p>`;
            } else {
                resultDiv.innerHTML = 'Country not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

searchBtn.addEventListener("click", searchCondition);
