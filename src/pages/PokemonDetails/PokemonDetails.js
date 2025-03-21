import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { Card, Flex, Image } from "antd"
import styles from "./PokemonDetails.module.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

function PokemonDetails(){
    const {id} = useParams()
    const [pokemon, setPokemon] = useState({})

    const fetchPokemonData = useCallback(async ()=>{
        try{
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            setPokemon(data)
        }
        catch(error){
            console.log(error)
        };
    }, [id])

    useEffect(()=>{
        fetchPokemonData()
    }, [fetchPokemonData])

    return(
        <div className={styles.fundoDetalhes}>
            <Header/>
            <Flex className={styles.flex}>
                <div className={styles.pokemonFundo}>
                    <Image src={pokemon.sprites?.front_default} width={300} preview={false} className={styles.pokemonImagem}/>
                </div>
                <Card title={<div><img src="PokeballPixel.png" alt="pokebola pixel art" className={styles.pokebolaPixel}/>{pokemon.id}   {pokemon.name}</div>} className={styles.detalhes}>
                    <Flex justify="space-around" className={styles.flex}>
                        <div>
                            <h3>Altura: {pokemon.height/10}m</h3>
                            <h3>Peso: {pokemon.weight/10}kg</h3>
                            <Flex><h3>Tipo(s):</h3>{pokemon.types && pokemon.types.map((typeObj)=>(
                                <h3 key={typeObj.slot}>
                                    {typeObj.type.name}
                                </h3>
                            ))}
                            </Flex>
                        </div>
                        <div>
                            <h3>Movimentos:</h3>
                            <ul>{pokemon.moves && pokemon.moves.slice(0,5).map((typeObj)=>(
                                <li key={typeObj.slot}>
                                    {typeObj.move.name}
                                </li>
                            ))}</ul>
                        </div>
                    </Flex>
                </Card>
            </Flex>
            <Footer/>
        </div>
    )
}

export default PokemonDetails