const matcher = require('../matcher')
const patterns = require('../patterns')
const weather = require('../weather')
const utils = require('../weather/utils')

const getString = async (reply) => {
    const cb = await matcher(reply,async cb=>{
    if(!cb.intent){
      console.log("i'm here")
        return("Sorry i can't do that")
    }else{
        if(cb.intent == "Exit"){
            return("Bye bye")
        }else if(cb.intent == "get weather"){
            const result = await weather.getWeatherForecast(cb.entities.city)
            const json = utils.getWeatherAtNoon(cb.entities.time,result)
            return(utils.advancedPretiffy(json,cb.entities.time,cb.entities.city))
        }else if(cb.intent == "current weather"){
            const result = await weather.getCurrentWeather(cb.entities.city)
            return(utils.prettify(result))
        }else if(cb.intent == "Hello"){
            return(cb.entities.greetings)
        }else if(cb.intent == "time"){
            const result = await weather.getCurrentWeather(cb.entities.city)
            var d = new Date().getTime()+result.timezone*1000;
            d = new Date(d);
            return(`In ${cb.entities.city} it is the `+d.toLocaleDateString("en-US")+" "+d.toLocaleTimeString("en-US"))
        }else if(cb.intent == "weather assertion"){
            const result = await weather.getWeatherForecast(cb.entities.city)
            let json = {
                time: cb.entities.time||"today",
                city: cb.entities.city,
                weather: cb.entities.weather
            };
            return(utils.GetWeatherAssertionResults(utils.getWeatherAtNoon(json.time,result),json))
        }else{
            return(cb.intent)
        }
    }

})
console.log('cb',cb);
return cb;
};

module.exports = getString

