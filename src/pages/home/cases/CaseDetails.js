import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getById, getRelationsById} from "../../services/NetworkService";
import {PersonCard} from "../people/PersonList";

export const CaseDetails = ({token})=> {
    let { id } = useParams();
    const [details, setDetails] = useState({})
    const [participants, setParticipants] = useState([])
    const [participantsActive, setParticipantsActive] = useState(false)

    const getCase = async ()=> {
        let lst = await getById("case", id, token)
        setDetails(lst)
    }

    const dealCaseParticipants = async ()=> {

        if (participantsActive === false) {
            let lst = await getRelationsById("case", id, "participants", token)
            setParticipants(lst)
        }
        setParticipantsActive(!participantsActive)
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
            <div className="pt-2">
                <button className="container bg-dark rounded text-light" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseParticipants" onClick={dealCaseParticipants}>
                    Participants
                </button>
            </div>
            <div className="collapse pt-1" id="collapseParticipants">
                <div className="data-details card card-body overflow-auto">
                    {participants.map((p, i) => <PersonCard key={i} personInfo={p} last={i === (participants.length - 1)}/>)}
                </div>
            </div>
            </div>
        </div>
    );
}