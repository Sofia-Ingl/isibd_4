import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const OrganizationPageContext = createContext()

export const OrganizationPageState = ({children, token, id})=> {

    const [details, setDetails] = useState({})
    const [memberships, setMemberships] = useState([])
    const [cases, setCases] = useState([])
    const [activities, setActivities] = useState([])

    const [updMode, setUpdMode] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const getOrganizations = async ()=> {
        let res = await getById("organization", id, token)
        setDetails(res)
        console.log(details)
    }

    const fetchOrganizationMemberships = async ()=> {

        let lst = await getRelationsById("organization", id, "memberships", token)
        setMemberships(lst)


    }

    const fetchOrganizationCases = async ()=> {

        let lst = await getRelationsById("organization", id, "cases", token)
        setCases(lst)
    }


    const fetchOrganizationActivities = async ()=> {

        let lst = await getRelationsById("organization", id, "activities", token)
        setActivities(lst)
    }


    useEffect(() => {
        getOrganizations()
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
        <OrganizationPageContext.Provider value={{
            updMode, setUpdMode,
            details, setDetails,
            memberships,
            cases,
            activities,
            fetchOrganizationCases,
            fetchOrganizationMemberships,
            fetchOrganizationActivities
        }}>
            {children}
        </OrganizationPageContext.Provider>
    )
}