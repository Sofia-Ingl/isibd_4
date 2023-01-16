import React, {useContext, useEffect, useState} from "react";
import {CasePageContext} from "./CasePageState";
import {PersonUpdCard} from "../people/PersonList";
import {addRelationsById, deleteRelationsById, getAllExcept, modifyById} from "../../services/NetworkService";
import {OrganizationUpdCard} from "../organizations/OrganizationsList";
import {IncidentUpdCard} from "../incidents/IncidentsList";
import {ArticleUpdCard} from "../articles/ArticlesList";

// eslint-disable-next-line
const UpdAccordion = ({
                          entityName,
                          entityLst,
                          dealEntityDeleteLstFunc,
                          dealEntityAddLstFunc,
                          potentialEntities,
                          getAllExceptEntities,
                          networkWrapper,
                          EntityCard
})=> {


    return (
    <div className="accordion mb-3" id={`accordion${entityName}`}>

        <div className="accordion-item border-dark border-2">
            <h2 className="accordion-header" id={`headingOne${entityName}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapseOne${entityName}`} aria-expanded="true"
                        aria-controls={`collapseOne${entityName}`}>
                    {entityName}
                </button>
            </h2>
            <div id={`collapseOne${entityName}`} className="accordion-collapse collapse"
                 aria-labelledby={`headingOne${entityName}`} data-bs-parent={`#accordion${entityName}`}>
                <div className="accordion-body">

                    <div className="data-details card card-body overflow-auto">
                        {entityLst.map((p, i) =>
                            <div key={i} className="row">
                                <div className="col-1">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           value={`${p.id}`}
                                           defaultChecked={true}
                                           onChange={e => dealEntityDeleteLstFunc(e.target)}
                                    />
                                </div>
                                <div className="col-11">
                                    <EntityCard info={p} last={i === (entityLst.length - 1)}/>
                                </div>
                            </div>)}
                    </div>


                </div>
        </div>
        </div>
        <div className="accordion-item border-dark border-2">
                <h2 className="accordion-header" id={`headingTwo${entityName}`}>
                    <button className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target={`#collapseTwo${entityName}`}
                            aria-expanded="false" aria-controls={`collapseTwo${entityName}`}
                            onClick={()=> {networkWrapper(getAllExceptEntities)}}>
                        Add {entityName}
                    </button>
                </h2>
                <div id={`collapseTwo${entityName}`} className="accordion-collapse collapse"
                     aria-labelledby={`headingTwo${entityName}`} data-bs-parent={`#accordion${entityName}`}>
                    <div className="accordion-body">


                        <div className="data-details card card-body overflow-auto">
                            {potentialEntities.map((p, i) =>
                                <div key={i} className="row">
                                    <div className="col-1">
                                        <input className="form-check-input"
                                               type="checkbox"
                                               value={`${p.id}`}
                                               defaultChecked={false}
                                               onChange={e => dealEntityAddLstFunc(e.target)}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <EntityCard info={p} last={i === (potentialEntities.length - 1)}/>
                                    </div>
                                </div>)}
                        </div>


                    </div>
                </div>
            </div>
    </div>)
}


export const CaseUpdPage = ({token})=> {

    const {details, setDetails, setUpdMode, participants, fetchCaseParticipants,
        witnesses, fetchCaseWitnesses, orgs, fetchCaseOrganizations,
        incidents, fetchCaseIncidents, articles, fetchCaseArticles} = useContext(CasePageContext)

    const [temporalName, setTemporalName] = useState(details.name)
    const [temporalDescription, setTemporalDescription] = useState(details.description)
    const [temporalCompleteness, setTemporalCompleteness] = useState(details.completeness)
    const [temporalAccessLvl, setTemporalAccessLvl] = useState(details.accessLvl)

    const [potentialParticipants, setPotentialParticipants] = useState([])
    const [potentialWitnesses, setPotentialWitnesses] = useState([])
    const [potentialOrgs, setPotentialOrgs] = useState([])
    const [potentialIncidents, setPotentialIncidents] = useState([])
    const [potentialArticles, setPotentialArticles] = useState([])

    const [state, setState] = useState({
        participantsToDelete : [],
        participantsToAdd : [],
        witnessesToDelete : [],
        witnessesToAdd : [],
        orgsToDelete : [],
        orgsToAdd : [],
        incidentsToDelete : [],
        incidentsToAdd : [],
        articlesToDelete : [],
        articlesToAdd : []
    })


    useEffect(() => {
        if (participants.length === 0) {
            console.log('dealCaseParticipants()')
            fetchCaseParticipants()
        }
        if (witnesses.length === 0) {
            fetchCaseWitnesses()
        }

        if (orgs.length === 0) {
            fetchCaseOrganizations()
        }

        if (incidents.length === 0) {
            fetchCaseIncidents()
        }

        if (articles.length === 0) {
            fetchCaseArticles()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showCase = ()=> {
        setUpdMode(false)
    }


    const submitHandler = async (event) => {
        event.preventDefault()
        let updDetails = {
            id: details.id,
            accessLvl: temporalAccessLvl,
            name: temporalName,
            description: temporalDescription,
            completeness: temporalCompleteness
        }

        let res = await modifyById("case", details.id, token, updDetails)

        if (state.participantsToDelete.length !== 0) {
            await deleteRelationsById("case", "participants", details.id, token, state.participantsToDelete)
        }
        if (state.participantsToAdd.length !== 0) {
            await addRelationsById("case", "participants", details.id, token, state.participantsToAdd)
        }

        if (state.witnessesToDelete.length !== 0) {
            await deleteRelationsById("case", "witnesses", details.id, token, state.witnessesToDelete)
        }
        if (state.witnessesToAdd.length !== 0) {
            await addRelationsById("case", "witnesses", details.id, token, state.witnessesToAdd)
        }

        if (state.orgsToDelete.length !== 0) {
            await deleteRelationsById("case", "organizations", details.id, token, state.orgsToDelete)
        }
        if (state.orgsToAdd.length !== 0) {
            await addRelationsById("case", "organizations", details.id, token, state.orgsToAdd)
        }

        if (state.incidentsToDelete.length !== 0) {
            await deleteRelationsById("case", "incidents", details.id, token, state.incidentsToDelete)
        }
        if (state.incidentsToAdd.length !== 0) {
            await addRelationsById("case", "incidents", details.id, token, state.incidentsToAdd)
        }

        if (state.articlesToDelete.length !== 0) {
            await deleteRelationsById("case", "articles", details.id, token, state.articlesToDelete)
        }
        if (state.articlesToAdd.length !== 0) {
            await addRelationsById("case", "articles", details.id, token, state.articlesToAdd)
        }

        setDetails(res)
        setUpdMode(false)

    }

    const networkWrapper = async (wrappedFunc)=> {
        window.localStorage.setItem('case_upd_state', JSON.stringify(state))
        await wrappedFunc()
        setState(JSON.parse(window.localStorage.getItem('case_upd_state')))
        console.log("token")
        console.log(token)
    }


    const getAllExceptParticipants = async ()=> {
        let lst = await getAllExcept("person", token, participants)
        setPotentialParticipants(lst)
    }

    const getAllExceptWitnesses = async ()=> {
        let lst = await getAllExcept("person", token, witnesses)
        setPotentialWitnesses(lst)
    }

    const getAllExceptOrgs = async ()=> {
        let lst = await getAllExcept("organization", token, orgs)
        setPotentialOrgs(lst)
    }

    const getAllExceptIncidents = async ()=> {
        let lst = await getAllExcept("incident", token, incidents)
        setPotentialIncidents(lst)
    }

    const getAllExceptArticles = async ()=> {
        let lst = await getAllExcept("article", token, articles)
        setPotentialArticles(lst)
    }

    const dealParticipantsDeleteLst = (checkbox)=> {
        let participantId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.participantsToDelete = state.participantsToDelete.filter(item => { return item !== participantId})
        } else {
            state.participantsToDelete.push(participantId)
        }
        console.log("participantsToDelete")
        console.log(state.participantsToDelete)
    }

    const dealParticipantsAddLst = (checkbox)=> {
        let participantId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            state.participantsToAdd = state.participantsToAdd.filter(item => { return item !== participantId})
        } else {
            state.participantsToAdd.push(participantId)
        }
        console.log("participantsToAdd")
        console.log(state.participantsToAdd)
    }

    const dealWitnessesDeleteLst = (checkbox)=> {
        let witnessId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.witnessesToDelete = state.witnessesToDelete.filter(item => { return item !== witnessId})
        } else {
            state.witnessesToDelete.push(witnessId)
        }
    }

    const dealWitnessesAddLst = (checkbox)=> {
        let witnessesId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            state.witnessesToAdd = state.witnessesToAdd.filter(item => { return item !== witnessesId})
        } else {
            state.witnessesToAdd.push(witnessesId)
        }
    }

    const dealOrgsDeleteLst = (checkbox)=> {
        let orgId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.orgsToDelete = state.orgsToDelete.filter(item => { return item !== orgId})
        } else {
            state.orgsToDelete.push(orgId)
        }
    }

    const dealOrgsAddLst = (checkbox)=> {
        let orgId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            state.orgsToAdd = state.orgsToAdd.filter(item => { return item !== orgId})
        } else {
            state.orgsToAdd.push(orgId)
        }
    }

    const dealIncidentsDeleteLst = (checkbox)=> {
        let incidentId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.incidentsToDelete = state.incidentsToDelete.filter(item => { return item !== incidentId})
        } else {
            state.incidentsToDelete.push(incidentId)
        }
    }

    const dealIncidentsAddLst = (checkbox)=> {
        let incidentId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            state.incidentsToAdd = state.incidentsToAdd.filter(item => { return item !== incidentId})
        } else {
            state.incidentsToAdd.push(incidentId)
        }
    }

    const dealArticlesDeleteLst = (checkbox)=> {
        let articleId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.articlesToDelete = state.articlesToDelete.filter(item => { return item !== articleId})
        } else {
            state.articlesToDelete.push(articleId)
        }
    }

    const dealArticlesAddLst = (checkbox)=> {
        let articleId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            state.articlesToAdd = state.articlesToAdd.filter(item => { return item !== articleId})
        } else {
            state.articlesToAdd.push(articleId)
        }
    }

    return (
        <div className="container px-5">
            <div className="container w-75 ">
                <div className="mb-3">
                    <button type="button" className="btn btn-dark" onClick={showCase}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg> Cancel
                    </button>
                </div>

                <div className="p-2 border border-1 border-dark rounded">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <h3>Main data</h3>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputName"
                                   value={temporalName}
                                   onChange={e => setTemporalName(e.target.value)}/>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <textarea rows="3"
                                   className="form-control"
                                   id="inputDescription"
                                   value={temporalDescription}
                                   onChange={e => setTemporalDescription(e.target.value)}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputAccessLvl" className="form-label">Access level</label>
                            <select className="form-select" value={temporalAccessLvl}
                                    onChange={e => setTemporalAccessLvl(e.target.value)}>
                                {
                                    [...Array(parseInt(window.localStorage.getItem('accessLvl')) + 1).keys()].map(
                                        (i) => <option key={i} value={i}>{i}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <select className="form-select" value={temporalCompleteness}
                                    onChange={e => setTemporalCompleteness(e.target.value)}>
                                <option value="закрыто">закрыто</option>
                                <option value="открыто">открыто</option>
                            </select>
                        </div>


                        <div className="mb-3">
                            <h3>Details</h3>
                        </div>

                        <UpdAccordion
                            entityName={"Participants"}
                            entityLst={participants}
                            potentialEntities={potentialParticipants}
                            dealEntityAddLstFunc={dealParticipantsAddLst}
                            dealEntityDeleteLstFunc={dealParticipantsDeleteLst}
                            getAllExceptEntities={getAllExceptParticipants}
                            networkWrapper={networkWrapper}
                            EntityCard={PersonUpdCard}
                        />

                        <UpdAccordion
                            entityName={"Witnesses"}
                            entityLst={witnesses}
                            potentialEntities={potentialWitnesses}
                            dealEntityAddLstFunc={dealWitnessesAddLst}
                            dealEntityDeleteLstFunc={dealWitnessesDeleteLst}
                            getAllExceptEntities={getAllExceptWitnesses}
                            networkWrapper={networkWrapper}
                            EntityCard={PersonUpdCard}
                        />

                        <UpdAccordion
                            entityName={"Organizations"}
                            entityLst={orgs}
                            potentialEntities={potentialOrgs}
                            dealEntityAddLstFunc={dealOrgsAddLst}
                            dealEntityDeleteLstFunc={dealOrgsDeleteLst}
                            getAllExceptEntities={getAllExceptOrgs}
                            networkWrapper={networkWrapper}
                            EntityCard={OrganizationUpdCard}
                        />

                        <UpdAccordion
                            entityName={"Incidents"}
                            entityLst={incidents}
                            potentialEntities={potentialIncidents}
                            dealEntityAddLstFunc={dealIncidentsAddLst}
                            dealEntityDeleteLstFunc={dealIncidentsDeleteLst}
                            getAllExceptEntities={getAllExceptIncidents}
                            networkWrapper={networkWrapper}
                            EntityCard={IncidentUpdCard}
                        />

                        <UpdAccordion
                            entityName={"Articles"}
                            entityLst={articles}
                            potentialEntities={potentialArticles}
                            dealEntityAddLstFunc={dealArticlesAddLst}
                            dealEntityDeleteLstFunc={dealArticlesDeleteLst}
                            getAllExceptEntities={getAllExceptArticles}
                            networkWrapper={networkWrapper}
                            EntityCard={ArticleUpdCard}
                        />


                        <button type="submit" className="btn btn-dark" >Submit</button>

                    </form>
                </div>

        </div>
        </div>
);

}