import React, {useState} from "react";
import "./AuthComponent.css"
import axios from "axios";
import {BASIC_URL} from "../../links";


export const AuthComponent = ({setToken}) => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")


    const submitHandler = async (event) => {
        event.preventDefault()
        const user = {
            login: login,
            password: password
        }

        console.log(user)

        try {
            const response = await axios.post(
                `${BASIC_URL}/user/auth`,
                JSON.stringify(user),
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            console.log(response);
            if (response.data.token !== '') {
                console.log(response.data.token);
                setToken(response.data.token)
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("Registration Failed");
                console.log(err.response?.status);
            }
        }

    }

    return (
        <div className="container pt-4 form-container">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="inputLogin" className="form-label">Login</label>
                    <input type="text"
                           className="form-control"
                           id="inputLogin"
                    value={login}
                    onChange={e => setLogin(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password"
                           className="form-control"
                           id="inputPassword"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>

    );
}