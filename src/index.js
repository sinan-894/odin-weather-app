import { format } from "date-fns"
import { displayWeatherData } from "./display"
import './style.css'

import searchSvg from "./search-alt-svgrepo-com.svg";



async function getWeatherData(location){
    try{
        console.log('loading......')
        displayLoading()
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=CNEXBFJPH8DQF552XSPHKFV37&contentType=json`)
        const data = await response.json()
        console.log(data)
        const extractData  = extractDataFromResponse(data)
        displayData(extractData)
        console.log(extractData)
    }
    catch{
        console.log('enter correct location')
        console.log('eneterd location:',location)
        displayError()
    } 
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
    label.textContent = 'Location';
    label.for = inputField.name;
    const button = document.createElement('button')
    const img  = document.createElement('img');
    img.src = searchSvg
    button.appendChild(img);
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
    spanForButton.innerHTML = ''
    spanForButton.appendChild(dom.tempratureConvertor())
    dataDiv.appendChild(dom.todayWeatherContainer())
    dataDiv.appendChild(dom.displayDataOfTheWeek())
}

function displayError(){
    dataDiv.innerHTML = ""
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-div')
    errorContainer.textContent = "Sorry!Location Not Found,Please Enter Valid Location"
    dataDiv.appendChild(errorContainer)
}

function displayLoading(){
    dataDiv.innerHTML = ""
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-div')
    loadingContainer.textContent = "Loading....."
    dataDiv.appendChild(loadingContainer)
}

const heading  = document.createElement('h1');
heading.classList.add('heading')
heading.textContent = 'What A Verthe!'
document.body.appendChild(heading)
const headDiv  = document.createElement('div');
headDiv.classList.add('head-div')
document.body.appendChild(headDiv);
headDiv.appendChild(createForm())

const spanForButton = document.createElement('span')
headDiv.appendChild(spanForButton);
const dataDiv = document.createElement('div');
dataDiv.classList.add('data-container')
document.body.appendChild(dataDiv);
