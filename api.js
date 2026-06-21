const coordinate_url = "https://geocoding-api.open-meteo.com/v1/search?name=Kenya&count=1&language=en&format=json"
const fetchData = "https://api.open-meteo.com/v1/forecast?latitude=-1.2833&longitude=36.8167&daily=weather_code&hourly=temperature_2m,weather_code,relative_humidity_2m,rain&current=temperature_2m,weather_code&timezone=auto&start_date=2026-05-31&end_date=2026-05-31"

export let coordinateApi = async (location) =>{
    try{
        let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=5&language=en&format=json`);
        let data = await response.json();
        let results  = data.results;

        if (!results || results.length === 0){
            return []
        };

        return results.map(loc =>({
            name:loc.name,
            longitude:loc.longitude,
            latitude:loc.latitude
        }
            
        ))

        
    }

    catch{
        console.log("Unable to get the data from the api")
        
    };
    
};

export let fetchWeather=async(latitude,longitude) =>{
    try{
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&hourly=temperature_2m,weather_code,relative_humidity_2m,rain&current=temperature_2m,weather_code&timezone=auto&start_date=2026-05-31&end_date=2026-05-31`)
        let data = await response.json();
        return data
    }
    catch{
        console.log("Can't find the weather Data")
    };
}  


