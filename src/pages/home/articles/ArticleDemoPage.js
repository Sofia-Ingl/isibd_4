import {useEffect, useState} from "react";
import {getById} from "../../services/NetworkService";
import {useParams} from "react-router-dom";

export const ArticleDemoPage = ({token})=> {

    let { id } = useParams();
    const [details, setDetails] = useState({})

    const getArticles = async ()=> {
        let res = await getById("article", id, token)
        setDetails(res)
        console.log(details)
    }
    // eslint-disable-next-line
    useEffect(()=> {
        getArticles()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container px-5">
            <div className="container w-75">
                <div className="card">
                    <div className="card-header bg-dark text-light">
                        Id: {details.id}
                    </div>
                    <div className="card card-body border-dark border-1">
                        <h3 className="card-title">{details.code} [{details.articleNumber}]</h3>
                        <h5 className="card-title">Description</h5>
                        <p className="card-text">{(details.description == null)? "[No-Description]": details.description}</p>
                    </div>
                    <div className="card-footer bg-dark bg-opacity-10">
                        Department: {details.departmentName}
                    </div>
                </div>

            </div>
        </div>
    )
}