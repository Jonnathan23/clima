import { object, string, number, InferOutput, parse } from 'valibot'
import axios from "axios"
import { SearchType } from "../types"
import { useMemo, useState } from 'react'


const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})
const initialWeather: Weather = { name: '', main: { temp: 0, temp_max: 0, temp_min: 0 } }
export type Weather = InferOutput<typeof WeatherSchema>

export default function useWeather() {

    const [weather, setWeather] = useState(initialWeather)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialWeather)

        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

        try {

            const { data } = await axios(geoUrl)

            if (!data[0]) {
                setNotFound(true)
                return
            }

            const { lat, lon } = data[0]

            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const { data: currentWeather } = await axios(currentWeatherUrl)

            // Valibot
            const result = parse(WeatherSchema, currentWeather)

            result && setWeather(result)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather.name])

    return {
        weather,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound

    }
}