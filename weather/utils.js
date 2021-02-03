const prettify = json =>{
    const status = getWeatherCaracteristics(json)
    return`In ${json.name} it is ${status[0]} and ${status[1]}. The temperature is ${json.main.temp} °C and feels like ${json.main.feels_like} °C`
}

const getWeatherAtNoon = (day,json) =>{
    if(day=="today"){
        day = 0
    }else if(day == "tomorrow"){
        day = 1
    }else if (day == "the day after tomorrow"){
        day = 2
    }

    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()+day);
    const dateString = tomorrow.toISOString().substring(0, 10)+" 12:00:00";
    for (let element in json.list){
        if(json.list[element].dt_txt == dateString){
            return json.list[element]
        }
    }
    return json.list[0]

}

const advancedPretiffy = (json,day,city)=>{
    let status = '\x1b[33msunny\x1b[0m';
    if(json.weather[0].main == 'Clouds'){
        status = "\x1b[2m\x1b[37mcloudy\x1b[0m"
    }else if(json.weather[0].main == "Rainning"){
        status = "\x1b[34mraining\x1b[0m"
    }else if(json.weather[0].main == "Clear"){
        status = "\x1b[32mclear\x1b[0m"
    }
    let tempStatus = "\x1b[31mhot\x1b[0m"
    const temp = json.main.temp
    if(temp <= 0){
        tempStatus = "\x1b[36mvery cold\x1b[0m"
    }else if(temp <= 10){
        tempStatus = "\x1b[34mcold\x1b[0m"
    }else if(temp <= 20){
        tempStatus = "\x1b[33mwarm\x1b[0m"
    }

    if(day == 0 || day=="today"){
        return`In ${city} it is ${status} and ${tempStatus}. The temperature is ${json.main.temp} °C and feels like ${json.main.feels_like} °C`
    }else if(day==1 || day=="tomorrow"){
        return`In ${city}, tomorrow it will be ${status} and ${tempStatus}. The temperature will be ${json.main.temp} °C and will feel like ${json.main.feels_like} °C`
    }else{
        return`In ${city}, the day after tomorrow it will be ${status} and ${tempStatus}. The temperature will be ${json.main.temp} °C and will feel like ${json.main.feels_like} °C`
    }

}

const getWeatherCaracteristics = json =>{
    let status = '\x1b[33msunny\x1b[0m';
    if(json.weather[0].main == 'Clouds'){
        status = "\x1b[2m\x1b[37mcloudy\x1b[0m"
    }else if(json.weather[0].main == "Rainning"){
        status = "\x1b[34mraining\x1b[0m"
    }else if(json.weather[0].main == "Clear"){
        status = "\x1b[32mclear\x1b[0m"
    }

    let tempStatus = "\x1b[31mhot\x1b[0m"
    const temp = json.main.temp
    if(temp <= 0){
        tempStatus = "\x1b[36mvery cold\x1b[0m"
    }else if(temp <= 10){
        tempStatus = "\x1b[34mcold\x1b[0m"
    }else if(temp <= 20){
        tempStatus = "\x1b[33mwarm\x1b[0m"
    }
    return [status, tempStatus]
}

const getWeatherCaracteristicsV2 = json =>{
    let status = 'sunny';
    if(json.weather[0].main == 'Clouds'){
        status = "cloudy"
    }else if(json.weather[0].main == "Rainning"){
        status = "raining"
    }else if(json.weather[0].main == "Clear"){
        status = "clear"
    }

    let tempStatus = "hot"
    const temp = json.main.temp
    if(temp <= 0){
        tempStatus = "very cold"
    }else if(temp <= 10){
        tempStatus = "cold"
    }else if(temp <= 20){
        tempStatus = "warm"
    }
    return [status, tempStatus]
}

const GetWeatherAssertionResults = (json,values)=>{
    let resultString = ""
    if(values.time == "today"||values.time =="Undefined"){
        if(getWeatherCaracteristicsV2(json).includes(values.weather)){
            resultString = `Yes it is \x1b[4m${values.weather}\x1b[0m today in ${values.city}`
        }else{
            resultString = `No it isn't \x1b[4m${values.weather}\x1b[0m today in ${values.city}`
        }
    }else{
        if(getWeatherCaracteristicsV2(json).includes(values.weather)){
            resultString = `Yes it will be \x1b[4m${values.weather}\x1b[0m ${values.time} in ${values.city}`
        }else{
            resultString = `No it won't be \x1b[4m${values.weather}\x1b[0m ${values.time} in ${values.city}`
        }
    }
    return resultString + " To be more accurate:\n"+advancedPretiffy(json,values.time,values.city)
}

module.exports = {prettify, getWeatherAtNoon, GetWeatherAssertionResults, advancedPretiffy }
