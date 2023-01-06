import "./CasesList.css"
import {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";
import {NavLink} from "react-router-dom";

const CaseCard = ({caseInfo})=> {
    return (
        <div className="card mb-4">
            <div className="card-header">
                {caseInfo.completeness}
            </div>
            <div className="card-body">
                <h5 className="card-title">[AL: {caseInfo.accessLvl}] {caseInfo.name}</h5>
                <p className="card-text text-truncate">Description: {caseInfo.description}</p>
                <NavLink to={`/cases/${caseInfo.id}`} className="btn btn-dark">Details</NavLink>
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
        <div className="container p-4 border border-dark border-3 rounded bg-dark">
            <div className="card-container p-4 border border-light border-3 rounded bg-dark">
                {/*<div className="card-container p-4 rounded bg-dark">*/}
                {cases.map((c, i) => <CaseCard key={i} caseInfo={c}/>)}
            </div>
        </div>

    );
}