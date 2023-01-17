import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const IncidentPageContext = createContext()

export const IncidentPageState = ({children, token, id})=> {

    const [details, setDetails] = useState({})
    const [cases, setCases] = useState([])

    const [updMode, setUpdMode] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const getIncidents = async ()=> {
        let res = await getById("incident", id, token)
        setDetails(res)
        console.log(details)
    }


    const fetchIncidentCases = async ()=> {

        let lst = await getRelationsById("incident", id, "cases", token)
        setCases(lst)
    }



    useEffect(() => {
        getIncidents()
        console.log(details)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (details == null) {
        return (
            <div className="container pt-4">
                <h1>Error</h1>
            </div>
        );
    }

    return (
        <IncidentPageContext.Provider value={{
            updMode, setUpdMode,
            details, setDetails,
            cases,
            fetchIncidentCases,

        }}>
            {children}
        </IncidentPageContext.Provider>
    )
}