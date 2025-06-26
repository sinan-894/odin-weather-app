

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

document.body.appendChild(createForm())