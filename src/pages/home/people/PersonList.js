import {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";
import {NavLink} from "react-router-dom";

export const PersonCard = ({personInfo, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {personInfo.status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{(personInfo.name == null)? "[Unknown]": personInfo.name} | {(personInfo.alias == null)? "[No-Alias]": personInfo.alias} </h5>
                <p className="card-text text-truncate">Citizenship: {personInfo.citizenship}</p>
                <p className="card-text text-truncate">Address: {personInfo.address}</p>
                <p className="card-text text-truncate">Birth date: {personInfo.birthDate}</p>
                <p className="card-text text-truncate">Location: {personInfo.location}</p>
                <p className="card-text">Sex: {personInfo.sex}</p>
                <NavLink to={`/people/${personInfo.id}`} className="btn btn-dark">Details</NavLink>
            </div>
            <div className="card-footer">
                Access level: {personInfo.accessLvl}
            </div>
            {/*<div className="card-body">*/}
            {/*    <h5 className="card-title">[AL: {caseInfo.accessLvl}] {caseInfo.name}</h5>*/}
            {/*    <p className="card-text text-truncate">Description: {caseInfo.description}</p>*/}
            {/*    <NavLink to={`/cases/${caseInfo.id}`} className="btn btn-dark">Details</NavLink>*/}
            {/*</div>*/}
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
        <div className="container p-4 border border-dark border-3 rounded bg-dark">
            <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
                {/*<div className="card-container p-4 rounded bg-dark">*/}
                {/*{cases.map((c, i) => <CaseCard key={i} caseInfo={c}/>)}*/}
            </div>
        </div>

    );
}