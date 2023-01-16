import "../../../App.css"
import {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";
import {NavLink} from "react-router-dom";

export const CaseCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {info.completeness}
            </div>
            <div className="card-body">
                <h5 className="card-title">{info.name}</h5>
                <p className="card-text text-truncate">Description: {info.description}</p>
                <NavLink to={`/cases/${info.id}`} className="btn btn-dark">Details</NavLink>
            </div>
            <div className="card-footer">
                Access level: {info.accessLvl}
            </div>
        </div>
    );
}

export const CasesList = ({token})=>{

    const [cases, setCases] = useState([])

    const getAllCases = async ()=> {
        let lst = await getAll("case", token)
        setCases(lst)
    }

    useEffect(() => {
        getAllCases()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        // <div className="container p-4 border border-dark border-3 rounded bg-dark">
            <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
                {/*<div className="card-container p-4 rounded bg-dark">*/}
                {cases.map((c, i) => <CaseCard key={i} info={c} last={i === (cases.length - 1)}/>)}
            </div>
        // </div>

    );
}