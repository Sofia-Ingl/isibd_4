import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getAll} from "../../services/NetworkService";

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

export const ArticlesList = ({token})=> {

    const [articles, setArticles] = useState([])

    const getAllArticles = async ()=> {
        let lst = await getAll("article", token)
        setArticles(lst)
    }

    useEffect(() => {
        getAllArticles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div>
        <div className="card-container overflow-auto p-4 border border-light border-3 rounded bg-dark">
            {/*<div className="card-container p-4 rounded bg-dark">*/}
            {articles.map((c, i) => <ArticleCard key={i} info={c} last={i === (articles.length - 1)}/>)}
        </div>

    </div>)
}