import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {AuthComponent} from "./pages/auth/AuthComponent";
import {Navbar} from "./pages/home/Navbar";
import {MainComponent} from "./pages/home/MainComponent";
import {CaseDetails} from "./pages/home/cases/CaseDetails";
import {CasesList} from "./pages/home/cases/CasesList";
import {PersonList} from "./pages/home/people/PersonList";
import {OrganizationsList} from "./pages/home/organizations/OrganizationsList";
import {CaseAddPage} from "./pages/home/cases/CaseAddPage";
import {PersonDetails} from "./pages/home/people/PersonDetails";
import {PersonAddPage} from "./pages/home/people/PersonAddPage";
import {OrganizationDetails} from "./pages/home/organizations/OrganizationDetails";
import {OrganizationAddPage} from "./pages/home/organizations/OrganizationAddPage";

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
              <div className="container pt-4">

                <Routes>
                    <Route path={'/'} exact element={<MainComponent/>}/>
                    <Route path={'/cases'} exact element={<CasesList token={token}/>}/>
                    <Route path={'/cases/add'} exact element={<CaseAddPage token={token}/>}/>
                    <Route path={'/cases/:id'} exact element={<CaseDetails token={token}/>}/>
                    <Route path={'/people'} exact element={<PersonList token={token}/>}/>
                    <Route path={'/people/add'} exact element={<PersonAddPage token={token}/>}/>
                    <Route path={'/people/:id'} exact element={<PersonDetails token={token}/>}/>
                    <Route path={'/organizations'} exact element={<OrganizationsList token={token}/>}/>
                    <Route path={'/organizations/add'} exact element={<OrganizationAddPage token={token}/>}/>
                    <Route path={'/organizations/:id'} exact element={<OrganizationDetails token={token}/>}/>
                    {/*<Route path={'/people/:id'} exact element={<Per token={token}/>}/>*/}
                    <Route path="*" element={<Navigate from="*" to="/" /> } />

                </Routes>
              </div>
          </BrowserRouter>
    );
}

export default App;
