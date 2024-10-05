const cityInput = document.getElementById('city');
const suggestionsList = document.getElementById('suggestions');
const getWeatherButton = document.getElementById('getWeather');
const responseDiv = document.getElementById('response');

cityInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    if (inputValue.length > 2) {
        fetch(`/suggest?city=${inputValue}`)
            .then(response => response.json())
            .then(cities => showSuggestions(cities))
            .catch(error => console.error('Error:', error));
    } else {
        suggestionsList.innerHTML = '';
    }
});

function showSuggestions(cities) {
    suggestionsList.innerHTML = '';
    if (cities.length > 0) {
        cities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            li.addEventListener('click', function() {
                cityInput.value = city;
                suggestionsList.innerHTML = '';
            });
            suggestionsList.appendChild(li);
        });
    }
}

getWeatherButton.addEventListener('click', function() {
    const city = cityInput.value;
    if (city) {
        responseDiv.innerHTML = `Buscando el clima para ${city}...`;
        fetch(`/weather?city=${city}`)
            .then(response => response.json())
            .then(data => {
                responseDiv.innerHTML = `
                    <h2>Clima en ${data.city}</h2>
                    <p>Temperatura: ${data.temperature}°C</p>
                    <p>Descripción: ${data.description}</p>
                    <p>Humedad: ${data.humidity}%</p>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                responseDiv.innerHTML = 'Error al obtener el clima. Por favor, intente de nuevo.';
            });
    } else {
        alert("Por favor, ingrese una ciudad.");
    }
});

document.addEventListener('click', function(e) {
    if (e.target !== cityInput && e.target !== suggestionsList) {
        suggestionsList.innerHTML = '';
    }
});