const APIKEY = '3b27df4c7ffe0c97fba50ee7df8e8d6c',
d = document;

let hourWeather = d.getElementById('weather-hour'),
    minutesWeather = d.getElementById('weather-minutes'),
    hourType = d.getElementById('weather-hourType'),
    dayWeather = d.getElementById('weather-day'),
    mounthWeather = d.getElementById('weather-mounth'),
    yearWeather = d.getElementById('weather-year'),
    cityWeather = d.getElementById('weather-city'),
    countryWeather = d.getElementById('weather-country'),
    iconWeather = d.getElementById('weather-icon'),
    valueWeather = d.getElementById('weather-value'),
    gradeWeather = d.getElementById('weather-grade'),
    gradeWeatherAlternate = d.getElementById('weather-gradeAlternate'),
    humidityWeather = d.getElementById('weather-humidity'),
    windWeather = d.getElementById('weather-wind'),
    pressureWeather = d.getElementById('weather-pressure');


const searchInput = d.getElementById('weather-input'),
    searchButton = d.getElementById('weather-button'),
    dayOpen = d.querySelector('.day__button'),
    dayClose = d.querySelector('.info__close'),
    infoDiv = d.querySelector('.info');


dayOpen.addEventListener('click', () =>{
    infoDiv.classList.add('info--active')
})

dayClose.addEventListener('click', () =>{
    infoDiv.classList.remove('info--active')
})

searchButton.addEventListener('click', e =>{
    e.preventDefault();
    getWeather(searchInput.value);
    console.log(searchInput.value)
})

const dayWeek = (day,month,year) =>{
    const weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekDay[new Date(`${day}/${month}/${year}`)]
}

const getWeather = async (city) =>{

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

    try{
        const response = await fetch(apiUrl);

        const dataCity = await response.json();
        console.log(dataCity)
        const{dt} = dataCity.dt;
        const{name} = dataCity;
        const{country} = dataCity.sys;
        const{temp,temp_min,humidity,pressure} = dataCity.main;
        const{speed} = dataCity.wind;
        const{id,description} = dataCity.weather[0];

        cityWeather.textContent = name;
        countryWeather.textContent = country;
        humidityWeather.textContent = humidity;
        pressureWeather.textContent = pressure;
        windWeather.textContent = speed;
        valueWeather.textContent = description;
        gradeWeather.textContent = Math.round(temp - 273);
        gradeWeatherAlternate.textContent = Math.round(temp_min - 273);

        if(id<300 && id>200){
            iconWeather.src = './src/assets/Thunderstorm.png';
        }else if(id<400 && id>300){
            iconWeather.src = './src/assets/HeavyCloud.png';
        }else if(id<600 && id>500){
            iconWeather.src = './src/assets/HeavyRain.png';
        }else if(id<700 && id>600){
            iconWeather.src = './src/assets/Snow.png';
        }else if(id<800 && id>700){
            iconWeather.src = './src/assets/HeavyCloud.png';
        }else if(id==800){
            iconWeather.src = './src/assets/LightCloud.png';
        }

    }catch(error){
        console.log(error)
    }

}

window.addEventListener('load',()=>{
    let lon, lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`

            fetch(apiUrl) .then((response)=>{
                return response.json();
                
            })
            .then(data =>{
                const{name} = data;
                const{country} = data.sys;
                const{temp,temp_min,humidity,pressure} = data.main;
                const{speed} = data.wind;
                const{id,description} = data.weather[0];
                // const{stations} = data.stations;
                // console.log(stations)
                let date = new Date()

                console.log(data)
                hourWeather.textContent = date.getHours();
                minutesWeather.textContent = date.getMinutes();
                yearWeather.textContent = date.getFullYear();
                cityWeather.textContent = name;
                countryWeather.textContent = country;
                humidityWeather.textContent = humidity;
                pressureWeather.textContent = pressure;
                windWeather.textContent = speed;
                valueWeather.textContent = description;
                gradeWeather.textContent = Math.round(temp - 273);
                gradeWeatherAlternate.textContent = Math.round(temp_min - 273);
                if(id<300 && id>200){
                    iconWeather.src = './src/assets/Thunderstorm.png';
                }else if(id<400 && id>300){
                    iconWeather.src = './src/assets/HeavyCloud.png';
                }else if(id<600 && id>500){
                    iconWeather.src = './src/assets/HeavyRain.png';
                }else if(id<700 && id>600){
                    iconWeather.src = './src/assets/Snow.png';
                }else if(id<800 && id>700){
                    iconWeather.src = './src/assets/HeavyCloud.png';
                }else if(id>800){
                    iconWeather.src = './src/assets/LightCloud.png';
                }

            })           
        })   
    }
})    