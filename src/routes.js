import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import PokemonList from "./pages/PokemonList/PokemonList";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PokemonList/>}/>
                <Route path="/:id" element={<PokemonDetails/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes