import { Image } from "antd"
import styles from "./CardPokedex.module.css"

function CardPokedex({pokemon, onclick}) {
    return(
        <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/pokedex.jpg)`}} className={styles.cardPokedex} 
        onClick={onclick}>
            <h3>#{pokemon.id}</h3>
            <Image src={pokemon.image}
            width={190}
            preview={false}
            />
            <h4>{pokemon.name}</h4>
        </div>
    )
}

export default CardPokedex