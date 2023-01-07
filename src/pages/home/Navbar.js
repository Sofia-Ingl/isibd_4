//export const Navbar = ({setToken}) => {
// import {NavLink} from "react-router-dom";
// import {useState} from "react";

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
                <a className="navbar-brand" href="/">Navbar</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                            {/*<NavLink to={`/`} className={`nav-link ${}`}>Home</NavLink>*/}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cases">Cases</a>
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