

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

    const displayDataOfTheWeek = ()=>{
        const container = document.createElement('div');
        container.classList.add('week-data-container');
        data.dataOfNextSixDays.forEach(dayData => {
            let dataDiv = document.createElement('div');
            dataDiv.classList.add('week-data')
            dataDiv.appendChild(displayData(dayData.day,'day-week'))
            dataDiv.appendChild(displayData(
                `${dayData.mintemp}-${dayData.maxtemp}`,'temp-week'))
            container.appendChild(dataDiv)
        });
        return container
    }

    return {todayWeatherContainer,displayDataOfTheWeek}
    
}