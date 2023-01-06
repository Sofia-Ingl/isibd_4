import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {AuthComponent} from "./pages/auth/AuthComponent";
import {Navbar} from "./pages/home/Navbar";
import {MainComponent} from "./pages/home/MainComponent";
import {CaseDetails} from "./pages/home/cases/CaseDetails";
import {CasesList} from "./pages/home/cases/CasesList";

function App() {

    const [token, setToken] = useState('');

   useEffect(() => {
        setToken(window.localStorage.getItem('token'));
       //token.current = window.localStorage.getItem('token')
    }, []);
    console.log((token==='')?'empty':token)

    //if(token.current === '') {
    if(token === '') {
        return <AuthComponent setToken={setToken} />
        //return <AuthComponent token={token} />
    }
    return (
          <BrowserRouter>
              <Navbar setToken={setToken}/>
              {/*<Navbar token={token}/>*/}
              <div className="container pt-4">

                <Routes>
                    <Route path={'/'} exact element={<MainComponent/>}/>
                    <Route path={'/cases'} exact element={<CasesList token={token}/>}/>
                    <Route path={'/cases/:id'} exact element={<CaseDetails token={token}/>}/>
                    <Route path="*" element={<Navigate from="*" to="/" /> } />

                </Routes>
              </div>
          </BrowserRouter>
    );
}

export default App;
