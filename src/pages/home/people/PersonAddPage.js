import React, {useState} from "react";
import {addEntity} from "../../services/NetworkService";
import {NavLink} from "react-router-dom";

export const PersonAddPage = ({token})=> {
    const [temporalName, setTemporalName] = useState(null)
    const [temporalAlias, setTemporalAlias] = useState(null)
    const [temporalStatus, setTemporalStatus] = useState('добропорядочный гражданин')
    const [temporalSex, setTemporalSex] = useState('м')
    const [temporalCitizenship, setTemporalCitizenship] = useState(null)
    const [temporalPassport, setTemporalPassport] = useState(null)
    const [temporalAddress, setTemporalAddress] = useState(null)
    const [temporalLocation, setTemporalLocation] = useState(null)
    const [temporalAccessLvl, setTemporalAccessLvl] = useState(0)

    const submitHandler = async (event)=> {
        event.preventDefault()

        let newPerson = {
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

        await addEntity("person", token, newPerson)
        window.location = '/people'
    }

    return (
        <div className="container px-5">
            <div className="container w-75 ">
                <div className="mb-3">
                    <NavLink type="button" className="btn btn-dark" to="/people">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg> Cancel
                    </NavLink>
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

                        <button type="submit" className="btn btn-dark" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}