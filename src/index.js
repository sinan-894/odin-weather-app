import { format } from "date-fns"
import { displayWeatherData } from "./display"



async function getWeatherData(location){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=CNEXBFJPH8DQF552XSPHKFV37&contentType=json`)
    const data = await response.json()
    console.log(data)
    const extractData  = extractDataFromResponse(data)
    displayData(extractData)
    console.log(extractData)
    // try{
    //     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=CNEXBFJPH8DQF552XSPHKFV37&contentType=json`)
    //     const data = await response.json()
    //     console.log(data)
    //     const extractData  = extractDataFromResponse(data)
    //     console.log(extractData)
    // }
    // catch{
    //     console.log('enter correct location')
    //     console.log('eneterd location:',location)
    // } 
}


function extractDataFromResponse(data){
    const currentTemp = data.currentConditions.temp
    const currentDiscription = data.currentConditions.conditions
    const location = data.address

    const formatDate = (distanceFromToday=0)=>{
        const date = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()+distanceFromToday
        );

        return format(date, 'eee dd MMM yyyy')
    }

    const dataOfNextSixDays = (()=>{
        return data.days.slice(1,7).map((day,index)=>{
            return {
                day:formatDate(index+1),
                mintemp : day.tempmin,
                maxtemp : day.tempmax
            }
        })
    })()

    

    return {day:formatDate(),currentTemp,currentDiscription,location,dataOfNextSixDays}
}

function createForm(){
    const form = document.createElement('form');
    form.classList.add('location-form');
    const inputField = document.createElement('input')
    inputField.type = 'text'
    inputField.name = 'location'
    inputField.classList.add('location-input');
    const label = document.createElement('label');
    label.textContent = 'location';
    label.for = inputField.name;
    const button = document.createElement('button')
    button.textContent = 'search';
    button.classList.add('search-button');

    function onSearch(event){
        event.preventDefault()
        getWeatherData(inputField.value)
    }

    button.addEventListener('click',event=>onSearch(event))
    button.addEventListener('keyup',(event)=>{
        if(event.key =="Enter")onSearch()
    })

    form.appendChild(label)
    form.appendChild(inputField)
    form.appendChild(button)

    return form

}

function displayData(data){
    const dom = displayWeatherData(data)
    dataDiv.innerHTML = ""
    spanForButton.append(dom.tempratureConvertor())
    dataDiv.appendChild(dom.todayWeatherContainer())
    dataDiv.appendChild(dom.displayDataOfTheWeek())
}

document.body.appendChild(createForm());
const spanForButton = document.createElement('span')
document.body.appendChild(spanForButton);
const dataDiv = document.createElement('div');
dataDiv.classList.add('data-container')
document.body.appendChild(dataDiv);
