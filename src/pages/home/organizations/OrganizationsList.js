import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";

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

export const OrganizationsList = ({token})=> {
    const [orgs, setOrgs] = useState([])

    const getAllOrgs = async ()=> {
        let lst = await getAll("organization", token)
        setOrgs(lst)
        console.log(orgs)
    }

    useEffect(() => {
        getAllOrgs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
                {orgs.map((p, i) => <OrganizationCard key={i} info={p} last={i === (orgs.length - 1)}/>)}
            </div>
            <div className="mt-3 w-50">
                <NavLink to="/organizations/add" className="btn btn-dark w-25" >Add organization</NavLink>
            </div>

        </div>

    );
}