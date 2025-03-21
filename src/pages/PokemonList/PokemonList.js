import { useCallback, useEffect, useState } from "react";
import styles from "./PokemonList.module.css"
import axios from "axios";
import { Flex, Pagination} from "antd";
import CardPokedex from "../../components/CardPokedex/CardPokedex";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function PokemonList(){
    const [page, setpage] = useState(1)
    const [pokemonData, setPokemonData] = useState([])
    const total = 1302
    const limit = 20

    const navigate = useNavigate()

    const fetchPokemonData = useCallback(async (page = 1)=>{
        try{
            const offset = (page - 1) * limit;
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            const dados = data.results.map((pokemon)=>{
                const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                return {...pokemon, id, image}
            })
            setPokemonData(dados)
        }
        catch(error){
            console.log(error)
        }
    }, [])

    useEffect(()=>{
        fetchPokemonData(page)
    }, [fetchPokemonData, page])

    return(
        <div className={styles.lista} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/fundo.avif)`}}>
            <Header/>

            <Flex justify="space-evenly" wrap gap="30px">
                {pokemonData.map((pokemon)=>(
                    <CardPokedex key={pokemon.id} pokemon={pokemon} onclick={()=>navigate(`/${pokemon.id}`)}/>
                ))}
            </Flex>

            <Pagination className={styles.pagecao}
                current={page}
                pageSize={limit}
                total={total}
                onChange={(page) => setpage(page)}
                showSizeChanger={false}
                showQuickJumper
                align={"center"}
            />

            <Footer/>
        </div>
    )
}

export default PokemonList;