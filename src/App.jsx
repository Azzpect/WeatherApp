import { useState,useRef, useEffect } from 'react';

function App() {
  const [city, setCity] = useState("");
  let weather = useRef(null);
  let weatherpic = useRef(null);
  let cityName = useRef(null);
  let country = useRef(null);
  let countryFlag = useRef(null);
  let temp = useRef(null);
  let coord = useRef(null);
  let humid = useRef(null);
  let wind = useRef(null);
  let timezone = useRef(null);
  let pressure = useRef(null);
  let sunrise = useRef(null);
  let sunset = useRef(null);

  const cityInput = (e) => {
    setCity(e.target.value);
  }
  useEffect(() => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];
    document.querySelector("#day").innerHTML = dayOfWeek;
  })

  function getTimezoneName(offset) {
    let timezone = offset<0?"UTC-":"UTC+";
    offset = Math.abs(offset);
    let m = offset/60;
    let h = Math.floor(m/60);
    m %= 60;
    m = m<10?"0"+m:m;
    h = h<10?"0"+h:h;
    return `${timezone}${h}:${m}`;
  }


  function convertUnixTimestampToTime(unixTimestamp) {
    let milliseconds = unixTimestamp * 1000;
    let dateObject = new Date(milliseconds);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    minutes = minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds;
    let formattedTime = hours + ':' + minutes + ':' + seconds;
    return formattedTime;
}

  const fetchWeatherData = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b2aca1cd5b452c67f3f08387fc92715`;
    setCity("");
    fetch(url, {
      method: "GET"
    }).then(res => {
      return res.json();
    }).then(data => {
      weather.current.innerHTML = data.weather[0].main;
      weatherpic.current.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      cityName.current.innerHTML = data.name;
      country.current.innerHTML = data.sys.country;
      countryFlag.current.src = `https://flagcdn.com/16x12/${data.sys.country.toLowerCase()}.png`
      coord.current.innerHTML = `${data.coord.lat}, ${data.coord.lon}`;
      temp.current.innerHTML = Number(data.main.temp-273.15).toFixed(2);
      humid.current.innerHTML = data.main.humidity;
      pressure.current.innerHTML = data.main.pressure;
      wind.current.innerHTML = data.wind.speed;
      timezone.current.innerHTML = getTimezoneName(data.timezone);
      sunrise.current.innerHTML = convertUnixTimestampToTime(data.sys.sunrise);
      sunset.current.innerHTML = convertUnixTimestampToTime(data.sys.sunset);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <div className='flex flex-col bg-gradient-to-tr from-blue-700 to-pink-600 relative' style={{width: '100vw', height: '90vh', boxSizing: 'border-box'}}>
        <h3 id='day' className='font-sans text-3xl font-bold text-yellow-50 mx-5 my-7'>Monday</h3>
        <img ref={weatherpic} src="" className='ml-16 relative top-8' alt="" width={100}/>
        <div id='current-weather-container' className='w-96 h-96 flex justify-between absolute right-0 top-24'>
          <div id="weather-stats" className='self-end gap-2 flex flex-wrap justify-between items-center w-44'>
            <div id="temp">
            <h3 className='text-yellow-50 text-xl font-mono font-bold'>temp:</h3>
              <div className='flex items-center ml-5 gap-1'>
                <img src="./public/images/temp.png" alt="" width={15}/>
                <h3 ref={temp} className='text-center text-yellow-50 text-lg font-mono font-bold'></h3>
              </div>
            </div>
            <div id="humidity">
              <h3 className='text-yellow-50 text-xl font-mono font-bold'>Humid:</h3>
              <div className='flex items-center ml-5 gap-1'>
                <img src="./public/images/humidity.png" alt="" />
                <h3 ref={humid} className='text-center text-yellow-50 text-lg font-mono font-bold'></h3>
              </div>
            </div>
            <div id="pressure">
              <h3 className='text-yellow-50 text-xl font-mono font-bold'>Pressure:</h3>
              <div className='flex items-center ml-5 gap-1'>
                <img src="./public/images/pressure.png" alt="" />
                <h3 ref={pressure} className='text-center text-yellow-50 text-lg font-mono font-bold'></h3>
              </div>
            </div>
            <div id="wind">
              <h3 className='text-yellow-50 text-xl font-mono font-bold'>Wind:</h3>
              <div className='flex items-center ml-5 gap-1'>
                <img src="./public/images/wind.png" alt="" />
                <h3 ref={wind} className='text-center text-yellow-50 text-lg font-mono font-bold'></h3>
              </div>
            </div>
            <div id="timezone">
              <h3 className='text-yellow-50 text-xl font-mono font-bold'>Timezone:</h3>
              <h3 ref={timezone} className='text-center text-yellow-50 text-sm font-mono font-bold'></h3>
            </div>
          </div>
          <div id="status-desc" className='h-44 mr-10 flex flex-col relative top-20'>
            <div id="country" className='w-12 flex items-center justify-around ml-20'>
              <img ref={countryFlag} src="" alt=""/>
              <h4 ref={country} className='text-yellow-50 text-lg font-sans font-semibold'></h4>
            </div>
            <h3 ref={cityName} className='text-center text-yellow-50 text-3xl font-mono font-bold'></h3>
            <h4 ref={coord} className='text-yellow-50 font-sans text-xs text-center'></h4>
            <h3 ref={weather} className='text-center text-yellow-50 text-2xl font-mono font-bold'></h3>
          </div>
        </div>
        <div id="input" className='w-full h-32 absolute bottom-40 flex flex-col items-center justify-around'>
          <input type="text" name="" id="" className='w-64 h-8 pl-3 text-lg outline-none rounded-xl' placeholder='Enter city name:' onChange={cityInput} value={city}/>
          <button className='bg-pink-400 w-20 h-8 rounded-xl' onClick={fetchWeatherData}>Search</button>
        </div>
        <div id="sun" className='w-38 flex flex-col absolute right-10 bottom-96'>
          <div id="sunrise" className='flex items-center justify-between'>
            <img src="./public/images/sunrise.png" width={50} alt="" />
            <h3 ref={sunrise} className='text-center text-yellow-50 text-lg font-mono font-bold ml-3'></h3>
          </div>
          <div id="sunset" className='flex items-center justify-between'>
            <img src="./public/images/sunset.png" width={50} alt="" />
            <h3 ref={sunset} className='text-center text-yellow-50 text-lg font-mono font-bold ml-3'></h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
