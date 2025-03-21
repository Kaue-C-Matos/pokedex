import { useCallback, useEffect, useState } from "react";
import styles from "./PokemonList.module.css"
import axios from "axios";
import { Flex, Pagination } from "antd";
import CardPokedex from "../../components/CardPokedex/CardPokedex";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Rodape from "../../components/Rodape/Rodape";

function PokemonList(){
    const [pagina, setPagina] = useState(1)
    const [pokemonData, setPokemonData] = useState([])
    const total = 1302
    const limite = 20

    const navigate = useNavigate()

    const fetchPokemonData = useCallback(async (pagina = 1)=>{
        try{
            const offset = (pagina - 1) * limite;
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`)
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
        fetchPokemonData(pagina)
    }, [fetchPokemonData, pagina])

    return(
        <div className={styles.lista} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/fundo.avif)`}}>
            <Cabecalho/>

            {/*Lista de Pokémons*/}
            <Flex justify="space-evenly" wrap gap="30px">
                {pokemonData.map((pokemon)=>(
                    <CardPokedex key={pokemon.id} pokemon={pokemon} onclick={()=>navigate(`/${pokemon.id}`)}/>
                ))}
            </Flex>
            <Pagination className={styles.paginacao}
                current={pagina}
                pageSize={limite}
                total={total}
                onChange={(pagina) => setPagina(pagina)}
                showSizeChanger={false}
                showQuickJumper
                align={"center"}
            />
            <Rodape/>
        </div>
    )
}

export default PokemonList;