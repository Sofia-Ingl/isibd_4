import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const CasePageContext = createContext()

export const CasePageState = ({children, token, id})=> {

    // let { id } = useParams();
    const [details, setDetails] = useState({})
    const [articles, setArticles] = useState([])
    // const [articlesActive, setArticlesActive] = useState(false)
    const [participants, setParticipants] = useState([])
    // const [participantsActive, setParticipantsActive] = useState(false)
    const [witnesses, setWitnesses] = useState([])
    // const [witnessesActive, setWitnessesActive] = useState(false)
    const [incidents, setIncidents] = useState([])
    // const [incidentsActive, setIncidentsActive] = useState(false)
    const [orgs, setOrgs] = useState([])
    // const [orgsActive, setOrgsActive] = useState(false)
    const [evidences, setEvidences] = useState([])
    // const [evidencesActive, setEvidencesActive] = useState(false)
    const [employees, setEmployees] = useState([])
    // const [employeesActive, setEmployeesActive] = useState(false)
    const [userResponsible, setUserResponsible] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [updMode, setUpdMode] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const getCase = async ()=> {
        let lst = await getById("case", id, token)
        setDetails(lst)
    }

    const fetchCaseParticipants = async ()=> {

        let lst = await getRelationsById("case", id, "participants", token)
        setParticipants(lst)
    }

    const fetchCaseWitnesses = async ()=> {

       let lst = await getRelationsById("case", id, "witnesses", token)
        setWitnesses(lst)

    }


    const fetchCaseOrganizations = async ()=> {

        let lst = await getRelationsById("case", id, "organizations", token)
        setOrgs(lst)
    }

    const fetchCaseEvidences = async ()=> {

        let lst = await getRelationsById("case", id, "evidences", token)
        setEvidences(lst)

    }

    const fetchCaseIncidents = async ()=> {
        let lst = await getRelationsById("case", id, "incidents", token)
        setIncidents(lst)

    }

    const fetchCaseArticles = async ()=> {

        let lst = await getRelationsById("case", id, "articles", token)
        setArticles(lst)

    }


    const setEmployeeResponsibility = async ()=> {
        let lst = await getRelationsById("case", id, "responsible_employees", token)
        let isUserResponsible = false
        let userEmployeeId = parseInt(window.localStorage.getItem('employee_id'))
        for (const employee of lst) {
            if (employee.id === userEmployeeId) {
                isUserResponsible = true
                break
            }
        }
        setUserResponsible(isUserResponsible)
    }

    const fetchCaseEmployees = async ()=> {

            let lst = await getRelationsById("case", id, "responsible_employees", token)
            setEmployees(lst)
    }

    useEffect(() => {
        getCase()
        setEmployeeResponsibility()
        //dealCaseEmployees()
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
        <CasePageContext.Provider value={{
            updMode, setUpdMode,
            details, setDetails,
            participants,
            witnesses,
            orgs,
            evidences,
            employees, fetchCaseEmployees,
            incidents,
            articles,
            fetchCaseOrganizations,
            fetchCaseParticipants,
            fetchCaseWitnesses,
            fetchCaseArticles,
            fetchCaseIncidents,
            fetchCaseEvidences,
            userResponsible
        }}>
            {children}
        </CasePageContext.Provider>
    )
}