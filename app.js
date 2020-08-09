const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet"
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true) {

    let ville;

    if(withIP = true) {
        const ip = await fetch("https://api.ipify.org?format=json")
            .then(resultat => resultat.json())
            .then(json => json.ip)

        const zip_code = await fetch('http://freegeoip.app/json/' + ip)
            .then(resultat => resultat.json())
            .then(json => json.zip_code)

        const county_code = await fetch('http://freegeoip.app/json/' + ip)
            .then(resultat => resultat.json())
            .then(json => json.country_code)

        ville = document.querySelector('#ville').textContent;

        console.log("===============");
        console.log('IP: ' + ip);
        console.log('ZIP CODE: ' + zip_code);
        console.log('COUNTRY CODE: ' + county_code);
        console.log("===============");
    } else {
        ville = document.querySelector('#ville').textContent;
    }

    meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&unit=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    console.log(meteo);
    displayWeatherInfos(meteo);
};

function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.humidity;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = temperature;
    document.querySelector('#description').textContent = capitalize(description);
    
    document.querySelector('i.wi').className = weatherIcons[conditions];
}

const ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable = true;
});
ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();