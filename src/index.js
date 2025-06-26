

async function getWeatherData(location){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=CNEXBFJPH8DQF552XSPHKFV37&contentType=json`)
    const data = await response.json()
    console.log(data) 
}

getWeatherData('london')
