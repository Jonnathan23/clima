import axios from "axios"
import { SearchType } from "../types"
import { z } from "zod"


// Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

type Weather = z.infer<typeof Weather>


export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`


        try {
            
            const { data } = await axios(geoUrl)

            const { lat, lon } = data[0]

            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const { data: currentWeather } = await axios(currentWeatherUrl)

            
            const result = Weather.safeParse(currentWeather)

            if (result.success) {
                console.log(result.data.name)
                console.log(result.data.main.temp)
            } else {
                console.log('Respuesta mal formada')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather

    }
}