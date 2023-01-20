import React, {useContext, useEffect, useState} from "react";
import {OrganizationPageContext} from "./OrganizationPageState";
import {
    addRelationsById,
    createRelatedEntities,
    deleteRelationsById,
    getAllExcept,
    modifyById
} from "../../services/NetworkService";
import {AddWithAttachAccordion, AttachAccordion} from "../AttachAccordion";
import {ActivityUpdCard} from "../activities/ActivitiesList";
import {OrganizationMembershipUpdCard} from "./OrganizationDemoPage";
import {PersonUpdCard} from "../people/PersonList";
import {AlertContext} from "../../alerts/AlertState";

export const OrganizationUpdPage = ({token})=> {

    const {setHidden, setMessage} = useContext(AlertContext)

    const {details, setDetails, setUpdMode,
        memberships, fetchOrganizationMemberships,
        cases, fetchOrganizationCases,
        activities, fetchOrganizationActivities
    } = useContext(OrganizationPageContext)


    const [temporalName, setTemporalName] = useState(details.name)
    const [temporalAddress, setTemporalAddress] = useState(details.address)
    const [temporalAccessLvl, setTemporalAccessLvl] = useState(details.accessLvl)

    const [potentialActivities, setPotentialActivities] = useState([])
    const [potentialPeople, setPotentialPeople] = useState([])

    let roles = []

    const [state, setState] = useState({
        membershipsToDelete : [],
        membershipsToAdd : [],
        newMemberships : [],
        activitiesToDelete : [],
        activitiesToAdd : [],
    })


    useEffect(() => {
        if (cases.length === 0) {
            fetchOrganizationCases()
        }

        if (activities.length === 0) {
            fetchOrganizationActivities()
        }

        if (memberships.length === 0) {
            fetchOrganizationMemberships()
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showOrganization = ()=> {
        setUpdMode(false)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        let updDetails = {
            id: details.id,
            accessLvl: temporalAccessLvl,
            name: (temporalName==='') ? null : temporalName,
            address: (temporalAddress ==='') ? null : temporalAddress
        }

        if (updDetails.name === null) {
            setMessage('Organization name cannot be null!')
            setHidden(false)
        } else {
            let res = await modifyById("organization", details.id, token, updDetails)

            if (state.activitiesToDelete.length !== 0) {
                await deleteRelationsById("organization", "activities", details.id, token, state.activitiesToDelete)
            }
            if (state.activitiesToAdd.length !== 0) {
                await addRelationsById("organization", "activities", details.id, token, state.activitiesToAdd)
            }

            if (state.membershipsToDelete.length !== 0) {
                console.log(state.membershipsToDelete)
                await deleteRelationsById("organization", "memberships", details.id, token, state.membershipsToDelete)
            }
            if (state.membershipsToAdd.length !== 0) {
                for (let i = 0; i < state.membershipsToAdd.length; i++) {
                    state.newMemberships.push({
                            personId: state.membershipsToAdd[i],
                            organizationId: details.id,
                            memberRole: roles[i]
                        }
                    )
                }
                console.log(state.newMemberships)
                await createRelatedEntities("organization", "memberships", details.id, token, state.newMemberships)
            }

            setDetails(res)
            setUpdMode(false)
        }



    }

    // eslint-disable-next-line
    const networkWrapper = async (wrappedFunc)=> {
        window.localStorage.setItem('organization_upd_state', JSON.stringify(state))
        await wrappedFunc()
        setState(JSON.parse(window.localStorage.getItem('organization_upd_state')))
    }

    const getAllExceptActivities = async ()=> {
        if (potentialActivities.length === 0) {
            let lst = await getAllExcept("activity", token, activities)
            setPotentialActivities(lst)
        }
    }

    const getAllExceptPeople = async ()=> {
        if (potentialPeople.length === 0) {
            let people = memberships.map(mem => {return {id: mem.personId}})
            let lst = await getAllExcept("person", token, people)
            setPotentialPeople(lst)
        }
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

    const dealMembershipsDeleteLst = (checkbox)=> {
        let mId = parseInt(checkbox.value)
        if (checkbox.checked) {
            state.membershipsToDelete = state.membershipsToDelete.filter(item => { return item !== mId})
        } else {
            state.membershipsToDelete.push(mId)
        }
    }

    // const dealMembershipsAddLst = (checkbox, role)=> {
    //     let pId = parseInt(checkbox.value)
    //     if (checkbox.checked) {
    //         state.newMemberships.push({
    //             organizationId: details.id,
    //             personId: pId,
    //             memberRole: role
    //         })
    //     } else {
    //         state.newMemberships = state.newMemberships.filter(item => { return item.personId !== pId})
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
                    <button type="button" className="btn btn-dark" onClick={showOrganization}>
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
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <textarea rows="2"
                                      className="form-control"
                                      id="inputAddress"
                                      value={temporalAddress}
                                      onChange={e => setTemporalAddress(e.target.value)}/>
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
                            <h3>Details</h3>
                        </div>

                        <AttachAccordion
                            entityName={"Activities"}
                            entityLst={activities}
                            potentialEntities={potentialActivities}
                            dealEntityAddLstFunc={dealActivitiesAddLst}
                            dealEntityDeleteLstFunc={dealActivitiessDeleteLst}
                            getAllExceptEntities={getAllExceptActivities}
                            networkWrapper={networkWrapper}
                            EntityCard={ActivityUpdCard}
                        />

                        <AddWithAttachAccordion
                            entityName={"Memberships"}
                            entityLst={memberships}
                            potentialBasicEntities={potentialPeople}
                            dealEntityDeleteLstFunc={dealMembershipsDeleteLst}
                            getAllExceptBasicEntities={getAllExceptPeople}
                            networkWrapper={networkWrapper}
                            EntityCard={OrganizationMembershipUpdCard}
                            BasicEntityCard={PersonUpdCard}
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