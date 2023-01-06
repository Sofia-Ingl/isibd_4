import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getById} from "../../services/NetworkService";

export const CaseDetails = ({token})=> {
    let { id } = useParams();
    const [details, setDetails] = useState({})

    const getCase = async ()=> {
        let lst = await getById("case", id, token)
        setDetails(lst)
    }

    useEffect(() => {
        getCase()
        console.log(details)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (details == null) {
        return (
            <div className="container pt-4">
                <h1>Error</h1>
            </div>
        );
    }
    return (
        <div className="container px-5">
            <div className="container w-75">
            {/*<p>Case id: {id}</p>*/}
            <div className="card">
                <div className="card-header">
                    Id: {details.id}
                    {/*Access level: {details.accessLvl}*/}
                </div>
                <div className="card card-body">
                    <h5 className="card-title">Name</h5>
                    <p className="card-text">{details.name}</p>
                    <h5 className="card-title">Description</h5>
                    <p className="card-text">{details.description}</p>
                    <h5 className="card-title">Status</h5>
                    <p className="card-text">{details.completeness}</p>

                </div>
                <div className="card-footer">
                    Access level: {details.accessLvl}
                </div>
            </div>
            {/*<p>*/}
            {/*    <button className="btn btn-dark" type="button" data-bs-toggle="collapse"*/}
            {/*            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">*/}
            {/*        Participants*/}
            {/*    </button>*/}
            {/*</p>*/}
            {/*<div className="collapse" id="collapseExample">*/}
            {/*    <div className="card card-body">*/}
            {/*        Some placeholder content for the collapse component. This panel is hidden by default but revealed*/}
            {/*        when the user activates the relevant trigger.*/}
            {/*    </div>*/}
            {/*</div>*/}
            </div>
        </div>
    );
}