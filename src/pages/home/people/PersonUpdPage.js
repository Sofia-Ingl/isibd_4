import React, {useContext, useEffect, useState} from "react";
import {PersonPageContext} from "./PersonPageState";
import {
    addRelationsById,
    createRelatedEntities,
    deleteRelationsById,
    getAllExcept,
    modifyById
} from "../../services/NetworkService";
import {AddWithAttachAccordion, AttachAccordion} from "../AttachAccordion";
import {ActivityUpdCard} from "../activities/ActivitiesList";
import {PersonMembershipUpdCard} from "./PersonDemoPage";
import {OrganizationUpdCard} from "../organizations/OrganizationsList";

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
    const [temporalAccessLvl, setTemporalAccessLvl] = useState(details.accessLvl)

    const [potentialActivities, setPotentialActivities] = useState([])
    // eslint-disable-next-line
    const [potentialOrgs, setPotentialOrgs] = useState([])
    let roles = []

    // const [potentialWitnessCases, setPotentialWitnessCases] = useState([])
    // const [potentialCases, setPotentialCases] = useState([])
    // const [potentialIncidents, setPotentialIncidents] = useState([])
    // const [potentialArticles, setPotentialArticles] = useState([])
    const [state, setState] = useState({
        membershipsToDelete : [],
        membershipsToAdd : [],
        newMemberships : [],
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
            name: (temporalName==='') ? null : temporalName,
            alias: (temporalAlias ==='') ? null : temporalAlias,
            status: temporalStatus,
            sex: temporalSex,
            citizenship: (temporalCitizenship ==='') ? null : temporalCitizenship,
            passport: (temporalPassport ==='') ? null : temporalPassport,
            address: (temporalAddress ==='') ? null : temporalAddress,
            location: (temporalLocation ==='') ? null : temporalLocation
        }

        let res = await modifyById("person", details.id, token, updDetails)

        if (state.activitiesToDelete.length !== 0) {
            await deleteRelationsById("person", "activities", details.id, token, state.activitiesToDelete)
        }
        if (state.activitiesToAdd.length !== 0) {
            await addRelationsById("person", "activities", details.id, token, state.activitiesToAdd)
        }

        if (state.membershipsToDelete.length !== 0) {
            console.log(state.membershipsToDelete)
            await deleteRelationsById("person", "memberships", details.id, token, state.membershipsToDelete)
        }
        if (state.membershipsToAdd.length !== 0) {
            for (let i = 0; i < state.membershipsToAdd.length; i++) {
                state.newMemberships.push({
                      organizationId: state.membershipsToAdd[i],
                      personId: details.id,
                      memberRole: roles[i]
                }
                )
            }

            console.log(state.newMemberships)
            await createRelatedEntities("person", "memberships", details.id, token, state.newMemberships)
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
        if (potentialActivities.length === 0) {
            let lst = await getAllExcept("activity", token, activities)
            setPotentialActivities(lst)
        }
    }

    const getAllExceptOrgs = async ()=> {
        if (potentialOrgs.length === 0) {
            let orgs = memberships.map(mem => {return {id: mem.organizationId}})
            let lst = await getAllExcept("organization", token, orgs)
            setPotentialOrgs(lst)
            for (let i = 0; i < potentialOrgs.length; i++) {
                roles.push('')
            }
        }
    }

    const dealActivitiesDeleteLst = (checkbox)=> {
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


    const dealMembershipsDeleteLst = (checkbox)=> {
        let mId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.membershipsToDelete = state.membershipsToDelete.filter(item => { return item !== mId})
        } else {
            state.membershipsToDelete.push(mId)
        }
    }

    // const dealMembershipsAddLst = (checkbox, role)=> {
    //     let oId = parseInt(checkbox.value)
    //     if (checkbox.checked) {
    //         state.newMemberships.push({
    //             organizationId: oId,
    //             personId: details.id,
    //             memberRole: role
    //         })
    //     } else {
    //         state.newMemberships = state.newMemberships.filter(item => { return item.organizationId !== oId})
    //     }
    //     console.log(state.newMemberships)
    // }

    const dealMembershipsAddLst = (checkbox)=> {
        let oId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.membershipsToAdd.push(oId)
        } else {
            state.membershipsToAdd = state.membershipsToAdd.filter(item => { return item !== oId})
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
                            <label htmlFor="inputSex" className="form-label">Sex</label>
                            <select className="form-select" id="inputStatus" value={temporalSex}
                                    onChange={e => setTemporalSex(e.target.value)}>
                                <option value="м">м</option>
                                <option value="ж">ж</option>
                            </select>
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
                            <h3>Details</h3>
                        </div>

                        <AttachAccordion
                            entityName={"Activities"}
                            entityLst={activities}
                            potentialEntities={potentialActivities}
                            dealEntityAddLstFunc={dealActivitiesAddLst}
                            dealEntityDeleteLstFunc={dealActivitiesDeleteLst}
                            getAllExceptEntities={getAllExceptActivities}
                            networkWrapper={networkWrapper}
                            EntityCard={ActivityUpdCard}
                        />


                        <AddWithAttachAccordion
                            entityName={"Memberships"}
                            entityLst={memberships}
                            potentialBasicEntities={potentialOrgs}
                            dealEntityDeleteLstFunc={dealMembershipsDeleteLst}
                            getAllExceptBasicEntities={getAllExceptOrgs}
                            networkWrapper={networkWrapper}
                            EntityCard={PersonMembershipUpdCard}
                            BasicEntityCard={OrganizationUpdCard}
                            dealEntityAddLstFunc={dealMembershipsAddLst}
                            extraDataLst={roles}
                        />

                        <button type="submit" className="btn btn-dark" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}