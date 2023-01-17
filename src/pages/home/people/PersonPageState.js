import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const PersonPageContext = createContext()

export const PersonPageState = ({children, token, id})=> {

    const [details, setDetails] = useState({})
    const [memberships, setMemberships] = useState([])
    const [cases, setCases] = useState([])
    const [witnessCases, setWitnessCases] = useState([])
    const [activities, setActivities] = useState([])

    const [updMode, setUpdMode] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const getPerson = async ()=> {
        let res = await getById("person", id, token)
        setDetails(res)
        console.log(details)
    }

    const fetchPersonMemberships = async ()=> {

        let lst = await getRelationsById("person", id, "memberships", token)
        setMemberships(lst)


    }

    const fetchPersonCases = async ()=> {

        let lst = await getRelationsById("person", id, "cases", token)
        setCases(lst)
    }


    const fetchPersonWitnessCases = async ()=> {

        let lst = await getRelationsById("person", id, "witness_cases", token)
        setWitnessCases(lst)
    }


    const fetchPersonActivities = async ()=> {

        let lst = await getRelationsById("person", id, "activities", token)
        setActivities(lst)
    }


    useEffect(() => {
        getPerson()
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
        <PersonPageContext.Provider value={{
            updMode, setUpdMode,
            details, setDetails,
            memberships,
            cases,
            witnessCases,
            activities,
            fetchPersonCases,
            fetchPersonMemberships,
            fetchPersonActivities,
            fetchPersonWitnessCases
        }}>
            {children}
        </PersonPageContext.Provider>
    )
}