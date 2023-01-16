import {NavLink} from "react-router-dom";

export const ArticleCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Department: {info.departmentName}
            </div>
            <div className="card-body">
                <h5 className="card-title">{info.code} [{info.articleNumber}]</h5>
                <p className="card-text text-truncate">Description: {info.description} </p>
                <NavLink to={`/articles/${info.id}`} className="btn btn-dark">Details</NavLink>
            </div>
        </div>
    );
}

export const ArticleUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                Department: {info.departmentName}
            </div>
            <div className="card-body">
                <h5 className="card-title text-truncate">{info.code} [{info.articleNumber}] [{info.description}]</h5>
            </div>
        </div>
    );
}

export const ArticlesList = ()=> {

}