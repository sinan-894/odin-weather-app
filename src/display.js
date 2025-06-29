

export function displayWeatherData(data){
    const todayWeatherContainer = ()=>{
        const container = document.createElement('div');
        container.classList.add('today-weather-contain');
        container.appendChild(displayData(data.location,'location'))
        container.appendChild(displayData(data.day,'day'))
        container.appendChild(displayData(data.currentTemp,'temprature'))
        container.appendChild(displayData(data.currentDiscription,'discription'))
        return container
    }

    const displayData = (content,classes) =>{
        const data  = document.createElement('section')
        data.classList.add(classes);
        data.textContent =content;
        return data
    }

    return {todayWeatherContainer}
    
}