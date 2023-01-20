import {createContext, useState} from "react";

export const AlertContext = createContext()

export const AlertState = ({children})=> {

    const [hidden, setHidden] = useState(true)
    const [message, setMessage] = useState('')

    return (
        <AlertContext.Provider value = {{
            hidden, message, setHidden, setMessage
        }}>
            {children}
        </AlertContext.Provider>
    )
}