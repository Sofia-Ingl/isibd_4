import {NavLink} from "react-router-dom";

export const OrganizationCard = ({orgInfo, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Access level: {orgInfo.accessLvl}
            </div>
            <div className="card-body">
                <h5 className="card-title">{(orgInfo.name == null)? "[Unknown]": orgInfo.name}</h5>
                <p className="card-text text-truncate">Address: {(orgInfo.address  == null)?
                    "[Unknown]": orgInfo.address} </p>
                <NavLink to={`/organizations/${orgInfo.id}`} className="btn btn-dark">Details</NavLink>
            </div>
        </div>
    );
}

export const OrganizationsList = ()=> {

}