const API_KEY = "5efbb2abf66e4da2be7e66b307e7df03";

// Preferably I would set the longitude/latitude dynamically, but that seems to be out of the purview of this project
// set for Boston
let latitude = '42.360081';
let longitude = '-71.058884';

// set for New York to test diff
// let latitude = '40.7128';
// let longitude = '-74.0060';

// DOM elements
const locationData = document.querySelector('#location');
const weekday = document.querySelector('#weekday');
const month = document.querySelector('#month');
const day = document.querySelector('#day');
const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');


// Time
let today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let getWeekDay = days[today.getDay()];
let getMonthAbreviation = today.toLocaleString('en-us', { month: 'short' });
let getDay = today.getDate();

const nth = function(d) {
	if (d > 3 && d < 21) return 'th';
	switch (d % 10) {
		case 1:  return "st";
		case 2:  return "nd";
		case 3:  return "rd";
		default: return "th";
	}
}

const formatAMPM = function(d) {
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

// Set App data
async function setApp() {
    let response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}&units=imperial`);
	
    if (response.status === 200) {
		let data = await response.json();

		// Add class to fade in app
		document.body.classList.add('is-loaded');

		// Preferably I would set the date/time dynamically as well, but that seems to be out of the purview of this project
		// Set date/time
		weekday.innerHTML = getWeekDay;
		month.innerHTML = getMonthAbreviation;
		day.innerHTML = getDay + nth(getDay);
		time.innerHTML = formatAMPM(today);

		// Set weather data
		locationData.innerHTML = data.data[0].city_name;
		temperature.innerHTML = data.data[0].temp;
		weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
		weatherDescription.innerHTML = data.data[0].weather.description;
    }
}

setApp();