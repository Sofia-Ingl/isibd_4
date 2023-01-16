import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const CasePageContext = createContext()

export const CasePageState = ({children, token, id})=> {

    // let { id } = useParams();
    const [details, setDetails] = useState({})
    const [articles, setArticles] = useState([])
    const [articlesActive, setArticlesActive] = useState(false)
    const [participants, setParticipants] = useState([])
    const [participantsActive, setParticipantsActive] = useState(false)
    const [witnesses, setWitnesses] = useState([])
    const [witnessesActive, setWitnessesActive] = useState(false)
    const [incidents, setIncidents] = useState([])
    const [incidentsActive, setIncidentsActive] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [orgsActive, setOrgsActive] = useState(false)
    const [evidences, setEvidences] = useState([])
    const [evidencesActive, setEvidencesActive] = useState(false)
    const [employees, setEmployees] = useState([])
    const [employeesActive, setEmployeesActive] = useState(false)
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
    const dealCaseParticipants = async ()=> {

        console.log('dealCaseParticipants')
        if (participantsActive === false) {
            await fetchCaseParticipants()
        }
        setParticipantsActive(!participantsActive)


    }

    const fetchCaseWitnesses = async ()=> {

       let lst = await getRelationsById("case", id, "witnesses", token)
        setWitnesses(lst)

    }
    const dealCaseWitnesses = async ()=> {

        if (witnessesActive === false) {
            await fetchCaseWitnesses()
        }
        setWitnessesActive(!witnessesActive)


    }


    const fetchCaseOrganizations = async ()=> {

        let lst = await getRelationsById("case", id, "organizations", token)
        setOrgs(lst)
    }
    const dealCaseOrganizations = async ()=> {

        if (orgsActive === false) {
            await fetchCaseOrganizations()
        }
        setOrgsActive(!witnessesActive)


    }

    const fetchCaseEvidences = async ()=> {

        let lst = await getRelationsById("case", id, "evidences", token)
        setEvidences(lst)

    }

    const dealCaseEvidences = async ()=> {

        if (evidencesActive === false) {
            await fetchCaseEvidences()
        }
        setEvidencesActive(!evidencesActive)


    }

    const fetchCaseIncidents = async ()=> {
        let lst = await getRelationsById("case", id, "incidents", token)
        setIncidents(lst)

    }
    const dealCaseIncidents = async ()=> {

        if (incidentsActive === false) {
            await fetchCaseIncidents()
        }
        setIncidentsActive(!incidentsActive)


    }

    const fetchCaseArticles = async ()=> {

        let lst = await getRelationsById("case", id, "articles", token)
        setArticles(lst)

    }

    const dealCaseArticles = async ()=> {

        if (articlesActive === false) {
            await fetchCaseArticles()
        }
        setArticlesActive(!articlesActive)


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

    const dealCaseEmployees = async ()=> {

        if (employeesActive === false) {
            let lst = await getRelationsById("case", id, "responsible_employees", token)
            setEmployees(lst)
        }
        setEmployeesActive(!employeesActive)
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
            participants, dealCaseParticipants,
            witnesses, dealCaseWitnesses,
            orgs, dealCaseOrganizations,
            evidences, dealCaseEvidences,
            employees, dealCaseEmployees,
            incidents, dealCaseIncidents,
            articles, dealCaseArticles,
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