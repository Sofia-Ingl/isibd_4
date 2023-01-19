import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";

export const ActivityCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Type: {info.activityType}
            </div>
            <div className="card-body">
                <p className="card-text">Description: {info.description} </p>
            </div>
            <div className="card-header">
                Legality: {info.legality}
            </div>
        </div>
    );
}

export const ActivityUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Type: {info.activityType}
            </div>
            <div className="card-body">
                <p className="card-text text-truncate">Description: {info.description} </p>
            </div>
        </div>
    );
}

export const ActivitiesList = ({token})=> {

    const [activities, setActivities] = useState([])

    const getAllActivities = async ()=> {
        let lst = await getAll("activity", token)
        setActivities(lst)
    }

    useEffect(() => {
        getAllActivities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div>
        <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
            {/*<div className="card-container p-4 rounded bg-dark">*/}
            {activities.map((c, i) => <ActivityCard key={i} info={c} last={i === (activities.length - 1)}/>)}
        </div>
        <div className="mt-3 w-50">
            <NavLink to="/activities/add" className="btn btn-dark w-25" >Add activity</NavLink>
        </div>

    </div>)
}