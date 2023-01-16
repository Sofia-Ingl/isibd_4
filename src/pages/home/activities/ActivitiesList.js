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

export const ActivitiesList = ()=> {

}