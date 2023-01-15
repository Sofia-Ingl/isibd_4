import React, {useContext, useEffect, useState} from "react";
import {CasePageContext} from "./CasePageState";
import {PersonUpdCard} from "../people/PersonList";
import {getAllExcept} from "../../services/NetworkService";

export const CaseUpdPage = ({token})=> {

    const {details, setUpdMode, participants, dealCaseParticipants,
        witnesses, dealCaseWitnesses} = useContext(CasePageContext)

    const submitHandler = async (event) => {
        event.preventDefault()
    }

    const [temporalName, setTemporalName] = useState(details.name)
    const [temporalDescription, setTemporalDescription] = useState(details.description)
    const [temporalCompleteness, setTemporalCompleteness] = useState(details.completeness)

    const [people, setPeople] = useState([])

    let participantsToDelete = []
    let participantsToAdd = []
    let witnessesToDelete = []

    useEffect(() => {
        if (participants.length === 0) {
            console.log('dealCaseParticipants()')
            dealCaseParticipants()
        }
        if (witnesses.length === 0) {
            dealCaseWitnesses()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showCase = ()=> {
        setUpdMode(false)
    }

    const getAllExceptParticipants = async ()=> {
        let lst = await getAllExcept("person", token, participants)
        console.log("PTC")
        console.log(participants)
        console.log(lst)
        setPeople(lst)
    }

    const dealParticipantsDeleteLst = (checkbox)=> {
        let participantId = parseInt(checkbox.value)
        if (checkbox.checked) {
            participantsToDelete = participantsToDelete.filter(item => { return item !== participantId})
        } else {
            participantsToDelete.push(participantId)
        }
        console.log("participantsToDelete")
        console.log(participantsToDelete)
    }

    const dealParticipantsAddLst = (checkbox)=> {
        let participantId = parseInt(checkbox.value)
        if (!checkbox.checked) {
            participantsToAdd = participantsToAdd.filter(item => { return item !== participantId})
        } else {
            participantsToAdd.push(participantId)
        }
        console.log("participantsToAdd")
        console.log(participantsToAdd)
    }

    const dealWitnessesDeleteLst = (checkbox)=> {
        let witnessId = parseInt(checkbox.value)
        if (checkbox.checked) {
            witnessesToDelete = witnessesToDelete.filter(item => { return item !== witnessId})
        } else {
            witnessesToDelete.push(witnessId)
        }
        console.log("witnessesToDelete")
        console.log(witnessesToDelete)
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

                        <div className="accordion mb-3" id="accordionExample">

                            <div className="accordion-item border-dark border-2">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                        Participants
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse"
                                     aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                            <div className="data-details card card-body overflow-auto">
                                                {participants.map((p, i) =>
                                                    <div key={i} className="row">
                                                        <div className="col-1">
                                                            <input className="form-check-input"
                                                                   type="checkbox"
                                                                   value={`${p.id}`}
                                                                   defaultChecked={true}
                                                                   onChange={e => dealParticipantsDeleteLst(e.target)}
                                                            />
                                                        </div>
                                                        <div className="col-11">
                                                            <PersonUpdCard personInfo={p} last={i === (participants.length - 1)}/>
                                                        </div>
                                                    </div>)}
                                            </div>


                                    </div>
                                </div>
                            </div>


                            <div className="accordion-item border-dark border-2">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo"
                                    onClick={getAllExceptParticipants}>
                                        Add participants
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">


                                        <div className="data-details card card-body overflow-auto">
                                                {people.map((p, i) =>
                                                    <div key={i} className="row">
                                                        <div className="col-1">
                                                            <input className="form-check-input"
                                                                   type="checkbox"
                                                                   value={`${p.id}`}
                                                                   defaultChecked={false}
                                                                   onChange={e => dealParticipantsAddLst(e.target)}
                                                            />
                                                        </div>
                                                        <div className="col-11">
                                                            <PersonUpdCard personInfo={p} last={i === (people.length - 1)}/>
                                                        </div>
                                                    </div>)}
                                        </div>



                                    </div>
                                </div>
                            </div>


                        </div>

                        {/*<div className="pt-2 btn-group" role="group">*/}
                        {/*    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"*/}
                        {/*            data-bs-target="#collapseParticipants">*/}
                        {/*        Participants*/}
                        {/*    </button>*/}
                        {/*    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"*/}
                        {/*            data-bs-target="#collapsePotentialParticipants" onClick={getAllPeople}>*/}
                        {/*        Add participants*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {/*<div className="collapse pt-1" id="collapseParticipants">*/}
                        {/*    <div className="data-details card card-body overflow-auto">*/}
                        {/*        {participants.map((p, i) =>*/}
                        {/*            <div key={i} className="row">*/}
                        {/*                <div className="col-1">*/}
                        {/*                    <input className="form-check-input"*/}
                        {/*                           type="checkbox"*/}
                        {/*                           value={`${p.id}`}*/}
                        {/*                           defaultChecked={true}*/}
                        {/*                           onChange={e => dealParticipantsDeleteLst(e.target)}*/}
                        {/*                    />*/}
                        {/*                </div>*/}
                        {/*                <div className="col-11">*/}
                        {/*                    <PersonUpdCard personInfo={p} last={i === (participants.length - 1)}/>*/}
                        {/*                </div>*/}
                        {/*            </div>)}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="collapse pt-1" id="collapsePotentialParticipants">*/}
                        {/*    <div className="data-details card card-body overflow-auto">*/}
                        {/*        {people.map((p, i) =>*/}
                        {/*            <div key={i} className="row">*/}
                        {/*                <div className="col-1">*/}
                        {/*                    <input className="form-check-input"*/}
                        {/*                           type="checkbox"*/}
                        {/*                           value={`${p.id}`}*/}
                        {/*                           defaultChecked={false}*/}
                        {/*                           onChange={e => dealParticipantsAddLst(e.target)}*/}
                        {/*                    />*/}
                        {/*                </div>*/}
                        {/*                <div className="col-11">*/}
                        {/*                    <PersonUpdCard personInfo={p} last={i === (people.length - 1)}/>*/}
                        {/*                </div>*/}
                        {/*            </div>)}*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="pt-2 pb-2">
                            <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseWitnesses">
                                Witnesses
                            </button>
                        </div>
                        <div className="collapse pt-1" id="collapseWitnesses">
                            <div className="data-details card card-body overflow-auto">
                                {witnesses.map((p, i) =>
                                    <div key={i} className="row">
                                        <div className="col-1">
                                            <input className="form-check-input"
                                                   type="checkbox"
                                                   value={`${p.id}`}
                                                   defaultChecked={true}
                                                   onChange={e => dealWitnessesDeleteLst(e.target)}
                                            />
                                        </div>
                                        <div className="col-11">
                                            <PersonUpdCard personInfo={p} last={i === (witnesses.length - 1)}/>
                                        </div>
                                    </div>)}
                            </div>
                        </div>


                        <button type="submit" className="btn btn-dark" >Submit</button>

                    </form>
                </div>

        </div>
        </div>
);

}