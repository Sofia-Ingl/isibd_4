import React, {useState} from "react";

export const EvidenceAddForm = ({onSubmitFunc})=> {

    const [type, setType] = useState('показания свидетеля')
    const [storage, setStorage] = useState(null)
    const [description, setDescription] = useState(null)
    const [accessLvl, setAccessLvl] = useState(0)

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="inputStorage" className="form-label">Storage</label>
                <input type="text"
                       className="form-control"
                       id="inputStorage"
                       value={storage}
                       onChange={e => setStorage(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <textarea rows="2"
                          className="form-control"
                          id="inputDescription"
                          value={description}
                          onChange={e => setDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="inputType" className="form-label">Type</label>
                <select className="form-select" id="inputType" value={type}
                        onChange={e => setType(e.target.value)}>
                    <option value="показания подозреваемого">показания подозреваемого</option>
                    <option value="показания обвиняемого">показания обвиняемого</option>
                    <option value="показания потерпевшего">показания потерпевшего</option>
                    <option value="показания свидетеля">показания свидетеля</option>
                    <option value="заключение эксперта">заключение эксперта</option>
                    <option value="вещественные доказательства">вещественные доказательства</option>
                    <option value="протоколы следственных действий">протоколы следственных действий</option>
                    <option value="протоколы судебных заседаний">протоколы судебных заседаний</option>
                    <option value="иные документы">иные документы</option>
                </select>
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
            <button type="button" className="btn btn-dark" onClick={(event) => {
                event.preventDefault()
                onSubmitFunc({type, storage, description, accessLvl})
            }}>Add evidence</button>
        </div>
    )
}