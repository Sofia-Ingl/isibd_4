import {Route, BrowserRouter, Routes} from 'react-router-dom'
import React, {useState} from 'react'
import {AuthComponent} from "./pages/auth/AuthComponent";
import {MainComponent} from "./pages/home/MainComponent";

function App() {

    const [token, setToken] = useState();

    if(!token) {
        return <AuthComponent setToken={setToken} />
    }
    return (
          <BrowserRouter>
            <div className="container pt-4">
              <Routes>
                <Route path={'/'} exact element={<MainComponent/>}/>
              </Routes>
            </div>
          </BrowserRouter>
    );
}

export default App;
