import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Context } from "./context/context";
import { useState } from "react";
import ResultPage from "./pages/ResultPage";


export default function AppRoute(){
    const [makeId, setMakeId] = useState();
    const [year, setYear] = useState('');


    return(

        <Context.Provider value={{ makeId, setMakeId, year, setYear}}>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={< Home/>}></Route>
                    <Route exact path={`/result/${makeId}/${year}`} element={<ResultPage />}></Route>                    
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )

}