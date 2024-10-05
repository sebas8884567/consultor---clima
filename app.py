from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

OPENWEATHERMAP_API_KEY = "f61db1e71c2dbeed15eafdb1e09684d9"  # Reemplaza con tu API key de OpenWeatherMap
OPENWEATHERMAP_API_URL = "http://api.openweathermap.org/data/2.5/weather"

# Lista de ciudades para sugerencias
CITIES = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Alicante']

@app.route('/')
def home():
    return render_template('index.html')  # Renderiza el archivo index.html

@app.route('/suggest')
def suggest_cities():
    query = request.args.get('city', '').lower()
    suggestions = [city for city in CITIES if query in city.lower()]
    return jsonify(suggestions[:5])  # Limitamos a 5 sugerencias

@app.route('/weather')
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    params = {
        'q': city,
        'appid': OPENWEATHERMAP_API_KEY,
        'units': 'metric',
        'lang': 'es'  # Agregamos el parámetro para la respuesta en español
    }

    response = requests.get(OPENWEATHERMAP_API_URL, params=params)
    
    if response.status_code == 200:
        data = response.json()
        weather_data = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'humidity': data['main']['humidity']
        }
        return jsonify(weather_data)
    else:
        return jsonify({"error": "Unable to fetch weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
