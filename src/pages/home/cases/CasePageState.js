import {createContext, useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";

export const CasePageContext = createContext()

export const CasePageState = ({children, token, id})=> {

    // let { id } = useParams();
    const [details, setDetails] = useState({})
    const [participants, setParticipants] = useState([])
    const [participantsActive, setParticipantsActive] = useState(false)
    const [witnesses, setWitnesses] = useState([])
    const [witnessesActive, setWitnessesActive] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [orgsActive, setOrgsActive] = useState(false)
    const [evidences, setEvidences] = useState([])
    const [evidencesActive, setEvidencesActive] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [updMode, setUpdMode] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const getCase = async ()=> {
        let lst = await getById("case", id, token)
        setDetails(lst)
    }

    const dealCaseParticipants = async ()=> {

        if (participantsActive === false) {
            let lst = await getRelationsById("case", id, "participants", token)
            setParticipants(lst)
        }
        setParticipantsActive(!participantsActive)
    }

    const dealCaseWitnesses = async ()=> {

        if (witnessesActive === false) {
            let lst = await getRelationsById("case", id, "witnesses", token)
            setWitnesses(lst)
        }
        setWitnessesActive(!witnessesActive)
    }

    const dealCaseOrganizations = async ()=> {

        if (orgsActive === false) {
            let lst = await getRelationsById("case", id, "organizations", token)
            setOrgs(lst)
        }
        setOrgsActive(!witnessesActive)
    }

    const dealCaseEvidences = async ()=> {

        if (evidencesActive === false) {
            let lst = await getRelationsById("case", id, "evidences", token)
            setEvidences(lst)
        }
        setEvidencesActive(!evidencesActive)
    }

    useEffect(() => {
        getCase()
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
            details,
            participants, dealCaseParticipants,
            witnesses, dealCaseWitnesses,
            orgs, dealCaseOrganizations,
            evidences, dealCaseEvidences
        }}>
            {children}
        </CasePageContext.Provider>
    )
}