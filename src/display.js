

export function displayWeatherData(data){
    const listOfTempValueTags = []

    const todayWeatherContainer = ()=>{
        const container = document.createElement('div');
        container.classList.add('today-weather-contain');
        container.appendChild(displayData(data.location,'location'))
        container.appendChild(displayData(data.day,'day'))
        container.appendChild(displayTempData(data.currentTemp,'temprature'))
        container.appendChild(displayData(data.currentDiscription,'discription'))
        return container
    }

    const displayData = (content,classes,tag='section') =>{
        const data  = document.createElement(tag)
        data.classList.add(classes);
        data.textContent =content;
        return data
    }

    const displayTempData = (temp,classes,tag='section')=>{
        const data = displayData(`${temp}°F`,classes,tag)
        listOfTempValueTags.push(data)
        return data
    }

    const addSymbol = (s)=>{
        const span = document.createElement('span')
        span.classList.add('temp-symbol');
        span.textContent = `°${s}`
        return span
    }

    const displayMinAndMaxValue =(mintemp,maxtemp,classes)=>{
        const data  = document.createElement('section')
        data.classList.add(classes)
        const seperator = document.createElement('span')
        seperator.textContent = '-'
        data.appendChild(displayTempData(mintemp,'min','span'))
        data.appendChild(seperator)
        data.appendChild(displayTempData(maxtemp,'max','span'))

        return data
    }

    const displayDataOfTheWeek = ()=>{
        const container = document.createElement('div');
        container.classList.add('week-data-container');
        data.dataOfNextSixDays.forEach(dayData => {
            let dataDiv = document.createElement('div');
            dataDiv.classList.add('week-data')
            dataDiv.appendChild(displayData(dayData.day,'day-week'))
            dataDiv.appendChild(displayMinAndMaxValue(
                dayData.mintemp,dayData.maxtemp,'temp-week'
            ))
            container.appendChild(dataDiv)
        });
        return container
    }

    const tempratureConvertor = ()=>{
        const button = document.createElement('button');
        button.textContent = 'Fahrenheit';
        button.addEventListener('click',()=>{
            let symbol = document.querySelectorAll('.temp-symbol')
            if(button.textContent=="Fahrenheit"){
                button.textContent = 'Celsius';
                convertTemprature(true)
            }
            else{
                button.textContent = 'Fahrenheit';
                convertTemprature(false)
            }
        })

        return button

    }

    const convertTemprature = (toCelsius)=>{
        const convertor = (toCelsius)?convertToCelsius:convertToFarenheit;
        const symbol = (toCelsius)?'C':'F'
        listOfTempValueTags.forEach(tag=>{
            console.log(tag.textContent)
            let temp  = Number(tag.textContent.split('°')[0])
            tag.textContent = `${convertor(temp).toFixed(1)}°${symbol}`
        })

    }
    

   

    const convertToFarenheit = (n)=>(n*(9/5)+32)
    const convertToCelsius = (n)=>((n-32)*(5/9))

    return {todayWeatherContainer,displayDataOfTheWeek,tempratureConvertor}
    
}