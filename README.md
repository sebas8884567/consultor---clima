# **Proyecto Consulta del Clima 🌤️**

Este proyecto es una aplicación web que permite consultar la información meteorológica de diferentes ciudades a través de la API de OpenWeatherMap. Proporciona datos como la **temperatura**, la **descripción del clima** y la **humedad**. La aplicación está diseñada utilizando **Flask** para el backend y **HTML, CSS, y JavaScript** para la interfaz de usuario.

## **Descripción General**

La aplicación permite a los usuarios ingresar el nombre de una ciudad y obtener la información del clima en tiempo real. Además, cuenta con una función de autocompletado para facilitar la búsqueda de ciudades, proporcionando sugerencias mientras el usuario escribe.

### **Características**
- **Autocompletado de ciudades**: Sugerencias de nombres de ciudades mientras se escribe.
- **Consulta en tiempo real**: Información meteorológica actualizada utilizando la API de OpenWeatherMap.
- **Interfaz de usuario intuitiva**: Diseño sencillo y responsive para que la aplicación sea accesible desde cualquier dispositivo.

## **Requisitos**

Para ejecutar esta aplicación localmente, necesitas:

- **Python 3.x**
- Librerías de Python:
  - Flask
  - Requests

## **Estructura del Proyecto**

```bash
proyecto-consulta-clima/
│
├── app.py                # Servidor Flask que maneja las solicitudes
├── templates/            # Carpeta que contiene los archivos HTML
│   └── index.html        # Archivo HTML principal
└── static/               # Carpeta que contiene los archivos estáticos (CSS, JS)
    ├── styles.css        # Archivo CSS para los estilos
    └── script.js         # Archivo JavaScript para la lógica de la aplicación
## **configuracion para el proyecto
1.Clona el repositorio
git clone https://github.com/tu-usuario/proyecto-consulta-clima.git
cd proyecto-consulta-clima
2.Instala las dependencias
pip install flask requests
3.Ejecuta el servidor flask
python app.py
4. abre el navegador y accede a
http://127.0.0.1:5000/
## **uso de la aplicacion**
En la página principal, ingresa el nombre de una ciudad en el campo de texto. Mientras escribes, se mostrarán sugerencias de ciudades.
Haz clic en "Obtener Clima" para ver la temperatura, descripción del clima y humedad de la ciudad seleccionada.


