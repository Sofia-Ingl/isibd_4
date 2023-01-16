import {NavLink} from "react-router-dom";

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

export const IncidentList = ()=> {

}