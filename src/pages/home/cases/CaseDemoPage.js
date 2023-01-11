import {PersonCard} from "../people/PersonList";
import {OrganizationCard} from "../organizations/OrganizationsList";
import {EvidenceCard} from "./EvidenceCard";
import {useContext} from "react";
import {CasePageContext} from "./CasePageState";

export const CaseDemoPage = ()=> {

    const {details, setUpdMode,
        participants, dealCaseParticipants,
        witnesses, dealCaseWitnesses,
        orgs, dealCaseOrganizations,
        evidences, dealCaseEvidences} = useContext(CasePageContext)

    const updateCase = ()=> {
        setUpdMode(true)
    }

    return (
        <div className="container px-5">
            <div className="container w-75">
                <button className="btn btn-light border-dark mb-2" type="button" onClick={updateCase}>
                    Update
                </button>
                <div className="card">
                    <div className="card-header bg-dark text-light">
                        Id: {details.id}
                        {/*Access level: {details.accessLvl}*/}
                    </div>
                    <div className="card card-body border-dark border-1">
                        <h5 className="card-title">Name</h5>
                        <p className="card-text">{details.name}</p>
                        <h5 className="card-title">Description</h5>
                        <p className="card-text">{details.description}</p>
                        <h5 className="card-title">Status</h5>
                        <p className="card-text">{details.completeness}</p>

                    </div>
                    <div className="card-footer bg-dark bg-opacity-10">
                        Access level: {details.accessLvl}
                    </div>
                </div>
                <div className="pt-2">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseParticipants" onClick={dealCaseParticipants}>
                        Participants
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseParticipants">
                    <div className="data-details card card-body overflow-auto">
                        {participants.map((p, i) => <PersonCard key={i} personInfo={p} last={i === (participants.length - 1)}/>)}
                    </div>
                </div>

                <div className="pt-2">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseWitnesses" onClick={dealCaseWitnesses}>
                        Witnesses
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseWitnesses">
                    <div className="data-details card card-body overflow-auto">
                        {witnesses.map((p, i) => <PersonCard key={i} personInfo={p} last={i === (witnesses.length - 1)}/>)}
                    </div>
                </div>

                <div className="pt-2">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOrganizations" onClick={dealCaseOrganizations}>
                        Organizations
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseOrganizations">
                    <div className="data-details card card-body overflow-auto">
                        {orgs.map((p, i) => <OrganizationCard key={i} orgInfo={p} last={i === (orgs.length - 1)}/>)}
                    </div>
                </div>

                <div className="pt-2">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseEvidences" onClick={dealCaseEvidences}>
                        Evidences
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseEvidences">
                    <div className="data-details card card-body overflow-auto">
                        {evidences.map((e, i) => <EvidenceCard key={i} evidenceInfo={e} last={i === (evidences.length - 1)}/>)}
                    </div>
                </div>

            </div>
        </div>
    )
}