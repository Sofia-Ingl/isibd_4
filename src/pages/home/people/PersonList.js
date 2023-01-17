import React, {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";
import {NavLink} from "react-router-dom";
import "../../../App.css"

export const PersonUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {info.status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{(info.name == null)? "[Unknown]": info.name} | {(info.alias == null)? "[No-Alias]": `"${info.alias}"`} </h5>
            </div>
        </div>
    );
}

export const PersonCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {info.status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{(info.name == null)? "[Unknown]": info.name} | {(info.alias == null)? "[No-Alias]": `"${info.alias}"`} </h5>
                <p className="card-text text-truncate">Address/Location: {(info.address  == null)?
                    "[Unknown]": info.address} / {(info.location  == null)?
                    "[Unknown]": info.location}</p>
                <NavLink to={`/people/${info.id}`} className="btn btn-dark">Details</NavLink>
            </div>
            <div className="card-footer">
                Access level: {info.accessLvl}
            </div>

        </div>
    );
}

export const PersonList = ({token})=>{

    const [people, setPeople] = useState([])

    const getAllPeople = async ()=> {
        let lst = await getAll("person", token)
        setPeople(lst)
        console.log(people)
    }

    useEffect(() => {
        getAllPeople()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
    <div>
        <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
            {people.map((p, i) => <PersonCard key={i} info={p} last={i === (people.length - 1)}/>)}
        </div>
        <div className="mt-3 w-50">
            <NavLink to="/people/add" className="btn btn-dark w-25" >Add person</NavLink>
        </div>

    </div>

    );
}