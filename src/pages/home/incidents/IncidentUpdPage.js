import React, {useContext, useEffect, useState} from "react";
import {IncidentPageContext} from "./IncidentPageState";
import {modifyById} from "../../services/NetworkService";
import {DatePicker, TimePicker} from "antd";
import dayjs from "dayjs";


export const IncidentUpdPage = ({token})=> {

    const {details, setDetails, setUpdMode,
        cases, fetchIncidentCases,
    } = useContext(IncidentPageContext)


    // time
    const [temporalDateString, setTemporalDateString] = useState(details.time.split('T')[0])
    // eslint-disable-next-line
    const [temporalTimeString, setTemporalTimeString] = useState(details.time.split('T')[1])
    const [temporalPlace, setTemporalPlace] = useState(details.place)
    const [temporalType, setTemporalType] = useState(details.type)
    const [temporalDescription, setTemporalDescription] = useState(details.description)
    const [temporalAccessLvl, setTemporalAccessLvl] = useState(details.accessLvl)



    useEffect(() => {
        if (cases.length === 0) {
            fetchIncidentCases()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showIncident = ()=> {
        setUpdMode(false)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        let updDetails = {
            id: details.id,
            accessLvl: temporalAccessLvl,
            place: (temporalPlace==='') ? null : temporalPlace,
            type: (temporalType ==='') ? null : temporalType,
            description: (temporalDescription ==='') ? null : temporalDescription,
            time: temporalDateString + 'T' + temporalTimeString
        }

        let res = await modifyById("incident", details.id, token, updDetails)

        setDetails(res)
        setUpdMode(false)

    }

    return (
        <div className="container px-5">
            <div className="container w-75 ">
                <div className="mb-3">
                    <button type="button" className="btn btn-dark" onClick={showIncident}>
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
                            <label htmlFor="inputPlace" className="form-label">Name</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputPlace"
                                   value={temporalPlace}
                                   onChange={e => setTemporalPlace(e.target.value)}/>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputType" className="form-label">Alias</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputType"
                                   value={temporalType}
                                   onChange={e => setTemporalType(e.target.value)}/>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Address</label>
                            <textarea rows="2"
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

                        <div className="container">
                            <div className="row">

                                <div className="col-sm">
                                    <div className="mb-3">
                                        <label htmlFor="inputDate" className="form-label">Date</label>
                                        <div>
                                            <DatePicker defaultValue={dayjs(temporalDateString)} onChange={(date, dateString)=> {setTemporalDateString(dateString)}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="mb-3">
                                        <label htmlFor="inputDate" className="form-label">Time</label>
                                        <div>
                                            <TimePicker defaultValue={dayjs(temporalTimeString, 'HH:mm:ss')} onChange={(time, timeString)=> {setTemporalTimeString(timeString)}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">

                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}