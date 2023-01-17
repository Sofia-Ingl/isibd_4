import {useContext} from "react";
import {IncidentPageContext} from "./IncidentPageState";
import {CaseCard} from "../cases/CasesList";

export const IncidentDemoPage = ()=> {
    const {details, setUpdMode,
        cases, fetchIncidentCases,
    } = useContext(IncidentPageContext)

    const updateIncident = ()=> {
        setUpdMode(true)
    }


    return (
        <div className="container px-5">
            <div className="container w-75">
                <button className="btn btn-light border-dark mb-2" type="button" onClick={updateIncident}>
                    Update
                </button>
                <div className="card">
                    <div className="card-header bg-dark text-light">
                        Id: {details.id}
                        {/*Access level: {details.accessLvl}*/}
                    </div>
                    <div className="card card-body border-dark border-1">
                        <h5 className="card-title">Time</h5>
                        <p className="card-text">{((details.time===undefined)|(details.time===null))? "[Unknown]": details.time.replace("T", " ")}</p>
                        <h5 className="card-title">Place</h5>
                        <p className="card-text">{(details.place == null)? "[Unknown]": `${details.place}`}</p>
                        <h5 className="card-title">Type</h5>
                        <p className="card-text">{details.type}</p>
                        <h5 className="card-title">Description</h5>
                        <p className="card-text">{(details.description == null)? "[No-Description]": details.description}</p>

                    </div>
                    <div className="card-footer bg-dark bg-opacity-10">
                        Access level: {details.accessLvl}
                    </div>
                </div>


                <div className="pt-3">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseCases" onClick={fetchIncidentCases}>
                        Cases
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseCases">
                    <div className="data-details card card-body overflow-auto">
                        {cases.map((p, i) => <CaseCard key={i} info={p} last={i === (cases.length - 1)}/>)}
                    </div>
                </div>

            </div>
        </div>
    )
}