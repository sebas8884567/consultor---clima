const cityInput = document.getElementById('city');
const suggestionsList = document.getElementById('suggestions');
const getWeatherButton = document.getElementById('getWeather');
const responseDiv = document.getElementById('response');
const animationBackground = document.getElementById('animation-background'); // Nuevo elemento para las animaciones

// Evento para la barra de sugerencias
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

// Mostrar las sugerencias de ciudades
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

// Evento para obtener el clima
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
                // Aquí se llama a la función de animación
                updateBackgroundAnimation(data.temperature, data.description);
            })
            .catch(error => {
                console.error('Error:', error);
                responseDiv.innerHTML = 'Error al obtener el clima. Por favor, intente de nuevo.';
            });
    } else {
        alert("Por favor, ingrese una ciudad.");
    }
});

// Añade la animación de fondo
function updateBackgroundAnimation(temperature, description) {
    animationBackground.innerHTML = ''; // Limpiar animaciones anteriores
    animationBackground.className = '';
    
    // Añadir nubes
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = `${Math.random() * 20}%`;
        cloud.style.animationDelay = `${Math.random() * 15}s`;
        animationBackground.appendChild(cloud);
    }
    
    // Cambio de fondo según la temperatura
    if (temperature < 10) {
        animationBackground.classList.add('cold-bg');
    } else if (temperature > 25) {
        animationBackground.classList.add('warm-bg');
        const sun = document.createElement('div');
        sun.className = 'sun';
        animationBackground.appendChild(sun);
    } else {
        animationBackground.classList.add('warm-bg');
    }

    // Animación de lluvia si la descripción incluye "rain" o "lluvia"
    if (description.toLowerCase().includes('rain') || description.toLowerCase().includes('lluvia')) {
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = `${Math.random() * 100}%`;
            raindrop.style.animationDelay = `${Math.random() * 2}s`;
            animationBackground.appendChild(raindrop);
        }
    }
}

// Mantén el resto del código existente para cerrar la lista de sugerencias
document.addEventListener('click', function(e) {
    if (e.target !== cityInput && e.target !== suggestionsList) {
        suggestionsList.innerHTML = '';
    }
});
