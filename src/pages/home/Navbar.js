//export const Navbar = ({setToken}) => {
export const Navbar = ({setToken}) => {

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
                            <a className="nav-link active" href="/">Home</a>
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