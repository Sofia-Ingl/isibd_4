import React, {useState} from "react";
import "./AuthComponent.css"
import axios from "axios";
import {BASIC_URL} from "../../links";

//
// export const AuthComponent = ({setToken}) => {

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
            window.localStorage.setItem('token', response.data.token);
            setToken(response.data.token)
            window.localStorage.setItem('employee_id', response.data.employee_id);
            console.log("response.data.employee_id")
            console.log(response.data.employee_id)
            window.localStorage.setItem('accessLvl', response.data.accessLvl)
            //token.current = response.data.token

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
                <button type="submit" className="btn btn-dark" >Submit</button>
            </form>
        </div>

    );
}