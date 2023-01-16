import React, {useContext, useEffect, useState} from "react";
import {PersonPageContext} from "./PersonPageState";
import {addRelationsById, deleteRelationsById, getAllExcept, modifyById} from "../../services/NetworkService";
import {UpdAccordion} from "../UpdAccordion";
import {ActivityUpdCard} from "../activities/ActivitiesList";

export const PersonUpdPage = ({token})=> {

    const {details, setDetails, setUpdMode,
        memberships, fetchPersonMemberships,
        cases, fetchPersonCases,
        witnessCases, fetchPersonWitnessCases,
        activities, fetchPersonActivities
    } = useContext(PersonPageContext)


    const [temporalName, setTemporalName] = useState(details.name)
    const [temporalAlias, setTemporalAlias] = useState(details.alias)
    const [temporalStatus, setTemporalStatus] = useState(details.status)
    const [temporalSex, setTemporalSex] = useState(details.sex)
    const [temporalCitizenship, setTemporalCitizenship] = useState(details.citizenship)
    const [temporalPassport, setTemporalPassport] = useState(details.passport)
    const [temporalAddress, setTemporalAddress] = useState(details.address)
    const [temporalLocation, setTemporalLocation] = useState(details.location)
    // birthDate
    const [temporalAccessLvl, setTemporalAccessLvl] = useState(details.accessLvl)

    const [potentialActivities, setPotentialActivities] = useState([])
    // const [potentialWitnessCases, setPotentialWitnessCases] = useState([])
    // const [potentialCases, setPotentialCases] = useState([])
    // const [potentialIncidents, setPotentialIncidents] = useState([])
    // const [potentialArticles, setPotentialArticles] = useState([])
    const [state, setState] = useState({
        membershipsToDelete : [],
        membershipsToAdd : [],
        activitiesToDelete : [],
        activitiesToAdd : [],
    })


    useEffect(() => {
        if (cases.length === 0) {
            console.log('dealCaseParticipants()')
            fetchPersonCases()
        }
        if (witnessCases.length === 0) {
            fetchPersonWitnessCases()
        }

        if (activities.length === 0) {
            fetchPersonActivities()
        }

        if (memberships.length === 0) {
            fetchPersonMemberships()
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showPerson = ()=> {
        setUpdMode(false)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        let updDetails = {
            id: details.id,
            accessLvl: temporalAccessLvl,
            name: temporalName,
            alias: temporalAlias,
            status: temporalStatus,
            sex: temporalSex,
            citizenship: temporalCitizenship,
            passport: temporalPassport,
            address: temporalAddress,
            location: temporalLocation
        }

        let res = await modifyById("person", details.id, token, updDetails)

        if (state.activitiesToDelete.length !== 0) {
            await deleteRelationsById("person", "activities", details.id, token, state.activitiesToDelete)
        }
        if (state.activitiesToAdd.length !== 0) {
            await addRelationsById("person", "activities", details.id, token, state.activitiesToAdd)
        }

        setDetails(res)
        setUpdMode(false)

    }

    // eslint-disable-next-line
    const networkWrapper = async (wrappedFunc)=> {
        window.localStorage.setItem('person_upd_state', JSON.stringify(state))
        await wrappedFunc()
        setState(JSON.parse(window.localStorage.getItem('person_upd_state')))
    }

    const getAllExceptActivities = async ()=> {
        let lst = await getAllExcept("activity", token, activities)
        setPotentialActivities(lst)
    }

    const dealActivitiessDeleteLst = (checkbox)=> {
        let activityId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.activitiesToDelete = state.activitiesToDelete.filter(item => { return item !== activityId})
        } else {
            state.activitiesToDelete.push(activityId)
        }
    }

    const dealActivitiesAddLst = (checkbox)=> {
        let activityId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            state.activitiesToAdd = state.activitiesToAdd.filter(item => { return item !== activityId})
        } else {
            state.activitiesToAdd.push(activityId)
        }
    }


    return (
        <div className="container px-5">
            <div className="container w-75 ">
                <div className="mb-3">
                    <button type="button" className="btn btn-dark" onClick={showPerson}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg> Cancel
                    </button>
                </div>

                <div className="p-2 mb-2 border border-1 border-dark rounded">
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
                            <label htmlFor="inputAlias" className="form-label">Alias</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputAlias"
                                   value={temporalAlias}
                                   onChange={e => setTemporalAlias(e.target.value)}/>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputCitizenship" className="form-label">Citizenship</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputCitizenship"
                                   value={temporalCitizenship}
                                   onChange={e => setTemporalCitizenship(e.target.value)}/>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPassport" className="form-label">Passport</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputPassport"
                                   value={temporalPassport}
                                   onChange={e => setTemporalPassport(e.target.value)}/>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <textarea rows="2"
                                      className="form-control"
                                      id="inputAddress"
                                      value={temporalAddress}
                                      onChange={e => setTemporalAddress(e.target.value)}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputLocation" className="form-label">Location</label>
                            <textarea rows="2"
                                      className="form-control"
                                      id="inputLocation"
                                      value={temporalLocation}
                                      onChange={e => setTemporalLocation(e.target.value)}/>
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
                            <label htmlFor="inputStatus" className="form-label">Status</label>
                            <select className="form-select" id="inputStatus" value={temporalStatus}
                                    onChange={e => setTemporalStatus(e.target.value)}>
                                <option value="заключенный">заключенный</option>
                                <option value="в розыске">в розыске</option>
                                <option value="подозреваемый">подозреваемый</option>
                                <option value="член окружения">член окружения</option>
                                <option value="добропорядочный гражданин">добропорядочный гражданин</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputSex" className="form-label">Sex</label>
                            <select className="form-select" id="inputStatus" value={temporalSex}
                                    onChange={e => setTemporalSex(e.target.value)}>
                                <option value="м">м</option>
                                <option value="ж">ж</option>
                            </select>
                        </div>


                        {/*// <h5 className="card-title">Sex</h5>*/}
                        {/*// <p className="card-text">{(details.sex == null)? "[Unknown]": details.sex}</p>*/}
                        {/*// <h5 className="card-title">Birth date</h5>*/}
                        {/*// <p className="card-text">{(details.birthDate == null)? "[Unknown]": details.birthDate}</p>*/}









                        <div className="mb-3">
                            <h3>Details</h3>
                        </div>

                        <UpdAccordion
                            entityName={"Activities"}
                            entityLst={activities}
                            potentialEntities={potentialActivities}
                            dealEntityAddLstFunc={dealActivitiesAddLst}
                            dealEntityDeleteLstFunc={dealActivitiessDeleteLst}
                            getAllExceptEntities={getAllExceptActivities}
                            networkWrapper={networkWrapper}
                            EntityCard={ActivityUpdCard}
                        />

                        <button type="submit" className="btn btn-dark" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}