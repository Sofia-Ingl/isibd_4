//export const Navbar = ({setToken}) => {
// import {NavLink} from "react-router-dom";
// import {useState} from "react";

import {NavLink} from "react-router-dom";

export const Navbar = ({setToken}) => {

    // const [chosen, setChosen] = useState('home');
    //
    // const clickHandler = (event) => {
    //
    // }

    const submitHandler = (event) => {
        window.localStorage.setItem('token', '');
        setToken('')
        //token = ''
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cases">Cases</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/people">People</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/organizations">Organizations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/incidents">Incidents</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={submitHandler}>
                       <button className="btn btn-outline-light" type="submit">Log out</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}