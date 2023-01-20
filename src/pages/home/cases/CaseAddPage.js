import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {addEntity} from "../../services/NetworkService";
import {AlertContext} from "../../alerts/AlertState";

export const CaseAddPage = ({token})=> {

    const {setHidden, setMessage} = useContext(AlertContext)

    const [accessLvl, setAccessLvl] = useState("0")
    const [temporalName, setTemporalName] = useState("")
    const [temporalDescription, setTemporalDescription] = useState("")

    const submitHandler = async (event) => {
        event.preventDefault()

        let newCase = {
            name: (temporalName === '')||(temporalName === undefined) ?null:temporalName,
            description: temporalDescription,
            accessLvl: accessLvl,
            completeness: 'открыто',
            initResponsibleEmployeeId: window.localStorage.getItem('employee_id')
        }

        if (newCase.name === null) {
            setMessage('Case name cannot be null!')
            setHidden(false)
        } else {
            await addEntity("case", token, newCase)
            window.location = '/cases'
        }

    }
    return (
    <div className="container px-5">
        <div className="container w-75 ">
            <div className="mb-3">
                <NavLink type="button" className="btn btn-dark" to="/cases">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-x" viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg> Cancel
                </NavLink>
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
                        <select className="form-select" value={accessLvl}
                                onChange={e => setAccessLvl(e.target.value)}>
                            {
                                [...Array(parseInt(window.localStorage.getItem('accessLvl')) + 1).keys()].map(
                                    (i) => <option key={i} value={i}>{i}</option>
                                )
                            }
                        </select>

                    </div>
                    <button type="submit" className="btn btn-dark" >Submit</button>
                </form>
            </div>
        </div>
    </div>
    );
}