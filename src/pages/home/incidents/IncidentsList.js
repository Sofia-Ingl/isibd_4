import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";

export const IncidentCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Time: {info.time.replace("T", " ")}
            </div>
            <div className="card-body">
                <h5 className="card-title">{info.type} [{info.place}]</h5>
                <p className="card-text text-truncate">Description: { info.description} </p>
                <NavLink to={`/incidents/${info.id}`} className="btn btn-dark">Details</NavLink>
            </div>
            <div className="card-footer">
                Access level: {info.accessLvl}
            </div>
        </div>
    );
}

export const IncidentUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Time: {info.time.replace("T", " ")}
            </div>
            <div className="card-body">
                <h5 className="card-title">{info.type} [{info.place}]</h5>
            </div>
        </div>
    );
}

export const IncidentsList = ({token})=> {
    const [incidents, setIncidents] = useState([])

    const getAllIncidents = async ()=> {
        let lst = await getAll("incident", token)
        setIncidents(lst)
    }

    useEffect(() => {
        getAllIncidents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        // <div className="container p-4 border border-dark border-3 rounded bg-dark">
        <div>
            <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
                {/*<div className="card-container p-4 rounded bg-dark">*/}
                {incidents.map((c, i) => <IncidentCard key={i} info={c} last={i === (incidents.length - 1)}/>)}
            </div>
            <div className="mt-3 w-50">
                <NavLink to="/incidents/add" className="btn btn-dark w-25" >Add incident</NavLink>
            </div>

        </div>

        // </div>

    );
}