import { useNavigate } from "react-router-dom"
import styles from "./Cabecalho.module.css"

function Cabecalho(){
    const navigate = useNavigate()

    return(
        <header>
            <img className={styles.logo} alt="logo da pokedex" src="pokedex logo.png" onClick={()=>navigate("/")}/>
        </header>
    )
}

export default Cabecalho