function processServerRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerRequest);
};

export const filterWeatherData = (data) => {
  const result = {};

  const mainTempF = data.main.temp;
  result.temp = {
    F: mainTempF,
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  //console.log(result.temp);
  result.city = data.name;
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunrise, sunset }, currentTime) => {
  return sunrise * 1000 < currentTime && currentTime < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
