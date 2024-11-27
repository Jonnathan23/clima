import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fecthWeather: (search: SearchType) => Promise<void>
}

export default function Form({ fecthWeather }: FormProps) {

    const initialState: SearchType = { city: '', country: '' }
    const [search, setSearch] = useState(initialState);
    const [alert, setAlert] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => setSearch({ ...search, [e.target.name]: e.target.value })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios');
            return;
        }

        fecthWeather(search)
        setAlert('')
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input type="text" name="city" id="city" value={search.city} placeholder="Ciudad..." onChange={handleChange} />
            </div>
            
            <div className={styles.field}>
                <label htmlFor="country">País</label>
                <select
                    name="country"
                    id="country"
                    value={search.country}
                    onChange={handleChange}
                    
                >
                    <option value="" defaultValue={'--- Seleccione un país ---'} disabled>--- Seleccione un país ---</option>
                                        {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value='Consultar clima' />
        </form>
    )
}