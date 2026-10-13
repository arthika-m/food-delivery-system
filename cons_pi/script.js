async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const output = document.getElementById("output");
    if (!city) {
        output.innerText = "Please enter a city name.";
        return;
    }
    output.innerText = "Loading weather...";
    try {
        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name="
            + encodeURIComponent(city) + "&count=1"
        );
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            output.innerText = "City not found.";
            return;
        }
        const place = geoData.results[0];
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude="
            + place.latitude
            + "&longitude=" + place.longitude
            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );
        const weatherData = await weatherResponse.json();
        const weather = weatherData.current;
        output.innerHTML =
            "<h3>Weather Details</h3>" +
            "<p>City: " + place.name + "</p>" +
            "<p>Temperature: " + weather.temperature_2m + " °C</p>" +
            "<p>Humidity: " + weather.relative_humidity_2m + " %</p>" +
            "<p>Wind Speed: " + weather.wind_speed_10m + " km/h</p>";

    } catch (error) {
        output.innerText = "Unable to fetch weather. Check your internet.";
        console.error(error);
    }
}
