import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const PersonPageContext = createContext()

export const PersonPageState = ({children, token, id})=> {

    const [details, setDetails] = useState({})
    const [memberships, setMemberships] = useState([])
    const [membershipsActive, setMembershipsActive] = useState(false)
    const [cases, setCases] = useState([])
    const [casesActive, setCasesActive] = useState(false)
    const [witnessCases, setWitnessCases] = useState([])
    const [witnessCasesActive, setWitnessCasesActive] = useState(false)
    const [activities, setActivities] = useState([])
    const [activitiesActive, setActivitiesActive] = useState(false)

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
    const dealPersonMemberships = async ()=> {

        if (membershipsActive === false) {
            await fetchPersonMemberships()
        }
        setMembershipsActive(!membershipsActive)
    }

    const fetchPersonCases = async ()=> {

        let lst = await getRelationsById("person", id, "cases", token)
        setCases(lst)
    }
    const dealPersonCases = async ()=> {

        if (casesActive === false) {
            await fetchPersonCases()
        }
        setCasesActive(!casesActive)
    }

    const fetchPersonWitnessCases = async ()=> {

        let lst = await getRelationsById("person", id, "witness_cases", token)
        setWitnessCases(lst)
    }
    const dealPersonWitnessCases = async ()=> {

        if (witnessCasesActive === false) {
            await fetchPersonWitnessCases()
        }
        setWitnessCasesActive(!witnessCasesActive)
    }

    const fetchPersonActivities = async ()=> {

        let lst = await getRelationsById("person", id, "activities", token)
        setActivities(lst)
    }
    const dealPersonActivities = async ()=> {

        if (activitiesActive === false) {
            await fetchPersonActivities()
        }
        setActivitiesActive(!activitiesActive)
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
            memberships, dealPersonMemberships,
            cases, dealPersonCases,
            witnessCases, dealPersonWitnessCases,
            activities, dealPersonActivities,
            fetchPersonCases,
            fetchPersonMemberships,
            fetchPersonActivities,
            fetchPersonWitnessCases
        }}>
            {children}
        </PersonPageContext.Provider>
    )
}