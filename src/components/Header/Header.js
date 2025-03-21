import { useNavigate } from "react-router-dom"
import styles from "./Header.module.css"

function Header(){
    const navigate = useNavigate()

    return(
        <header>
            <img className={styles.logo} alt="logo da pokedex" src="pokedex logo.png" onClick={()=>navigate("/")}/>
        </header>
    )
}

export default Header