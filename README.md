# React + TypeScript + Vite

### Modulos de CSS
Cuando se trabaja con modulos es necesario crear el archivo App.module.css, importar en el componente y en la etiqueta qie se desea aplicar estilos se
se llama como si fuera un objeto

```ts
import styles from"./App.module.css"

<h1 className={styles.title}>Buscador</h1>
```

### Variables de entorno
Para acceder a las variables de entorno en vite, en necesario que estén nombradas con VITE

```ts
import.meta.env.VITE_nombre
```

### Validacion de Tipado con nuestra API

Para hacer una validación al .json que nos devuelve nuestra api, si la hemos tipado correctamente.

#### Zod

Crea un tipado utilizando "z", es sencillo de utilizar

Desventajas:

** No es modular 
** Se vuelve pesado al importarlo en diferentes archivos

```bash
npm i zod
```

```ts
import { z } from "zod"


// Tipado con Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

type Weather = z.infer<typeof Weather>

//En la seccion de llamado a la API

 const fetchWeather = async (search: SearchType) => {

        try {
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/...`

            const { data: currentWeather } = await axios(currentWeatherUrl)

            // Verifica el tipado Zod con el json de la API
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

```


#### Valibot

