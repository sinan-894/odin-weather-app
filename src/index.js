

async function getWeatherData(location){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=CNEXBFJPH8DQF552XSPHKFV37&contentType=json`)
        const data = await response.json()
        console.log(data)
        extractDataFromResponse(data)
    }
    catch{
        console.log('enter correct location')
        console.log('eneterd location:',location)
    } 
}

getWeatherData('perinthalmanna')


function extractDataFromResponse(data){
    const TEMP = data.currentConditions.temp
    console.log(TEMP)
}