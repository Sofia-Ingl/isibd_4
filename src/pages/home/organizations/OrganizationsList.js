import {NavLink} from "react-router-dom";

export const OrganizationCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Access level: {info.accessLvl}
            </div>
            <div className="card-body">
                <h5 className="card-title">{(info.name == null)? "[Unknown]": info.name}</h5>
                <p className="card-text text-truncate">Address: {(info.address  == null)?
                    "[Unknown]": info.address} </p>
                <NavLink to={`/organizations/${info.id}`} className="btn btn-dark">Details</NavLink>
            </div>
        </div>
    );
}

export const OrganizationUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Access level: {info.accessLvl}
            </div>
            <div className="card-body">
                <h5 className="card-title">{(info.name == null)? "[Unknown]": info.name}</h5>
            </div>
        </div>
    );
}

export const OrganizationsList = ()=> {

}