import {useContext} from "react";
import {CaseCard} from "../cases/CasesList";
import {ActivityCard} from "../activities/ActivitiesList";
import {PersonPageContext} from "./PersonPageState";
import {NavLink} from "react-router-dom";


export const PersonMembershipCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-body">
                <h5 className="card-title">{info.organizationName} </h5>
                <p className="card-text text-truncate">Role: {info.memberRole}</p>
                <NavLink to={`/organizations/${info.organizationId}`} className="btn btn-dark">Organization details</NavLink>
            </div>
        </div>
    );
}

export const PersonMembershipUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-body">
                <h5 className="card-title">{info.organizationName} </h5>
                <p className="card-text text-truncate">Role: {info.memberRole}</p>
            </div>
        </div>
    );
}

export const PersonDemoPage = ()=> {
    const {details, setUpdMode,
        memberships, fetchPersonMemberships,
        cases, fetchPersonCases,
        witnessCases, fetchPersonWitnessCases,
        activities, fetchPersonActivities
    } = useContext(PersonPageContext)

    const updatePerson = ()=> {
        setUpdMode(true)
    }

    return (
        <div className="container px-5">
            <div className="container w-75">
                <button className="btn btn-light border-dark mb-2" type="button" onClick={updatePerson}>
                    Update
                </button>
                <div className="card">
                    <div className="card-header bg-dark text-light">
                        Id: {details.id}
                        {/*Access level: {details.accessLvl}*/}
                    </div>
                    <div className="card card-body border-dark border-1">
                        <h5 className="card-title">Name</h5>
                        <p className="card-text">{(details.name == null)? "[Unknown]": details.name}</p>
                        <h5 className="card-title">Alias</h5>
                        <p className="card-text">{(details.alias == null)? "[No-Alias]": `${details.alias}`}</p>
                        <h5 className="card-title">Status</h5>
                        <p className="card-text">{details.status}</p>
                        <h5 className="card-title">Sex</h5>
                        <p className="card-text">{(details.sex == null)? "[Unknown]": details.sex}</p>
                        <h5 className="card-title">Citizenship</h5>
                        <p className="card-text">{(details.citizenship == null)? "[Unknown]": details.citizenship}</p>
                        <h5 className="card-title">Passport</h5>
                        <p className="card-text">{(details.passport == null)? "[Unknown]": details.passport}</p>
                        <h5 className="card-title">Address</h5>
                        <p className="card-text">{(details.address == null)? "[Unknown]": details.address}</p>
                        <h5 className="card-title">Location</h5>
                        <p className="card-text">{(details.location == null)? "[Unknown]": details.location}</p>

                    </div>
                    <div className="card-footer bg-dark bg-opacity-10">
                        Access level: {details.accessLvl}
                    </div>
                </div>
                <div className="pt-3">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseMemberships" onClick={fetchPersonMemberships}>
                        Memberships
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseMemberships">
                    <div className="data-details card card-body overflow-auto">
                        {memberships.map((p, i) => <PersonMembershipCard key={i} info={p} last={i === (memberships.length - 1)}/>)}
                    </div>
                </div>

                <div className="pt-3">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseCases" onClick={fetchPersonCases}>
                        Cases
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseCases">
                    <div className="data-details card card-body overflow-auto">
                        {cases.map((p, i) => <CaseCard key={i} info={p} last={i === (cases.length - 1)}/>)}
                    </div>
                </div>

                <div className="pt-3">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseWitnessCases" onClick={fetchPersonWitnessCases}>
                        Witness cases
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseWitnessCases">
                    <div className="data-details card card-body overflow-auto">
                        {witnessCases.map((p, i) => <CaseCard key={i} info={p} last={i === (witnessCases.length - 1)}/>)}
                    </div>
                </div>

                <div className="mb-3">
                    <div className="pt-3">
                        <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseActivities" onClick={fetchPersonActivities}>
                            Activities
                        </button>
                    </div>
                    <div className="collapse pt-1" id="collapseActivities">
                        <div className="data-details card card-body overflow-auto">
                            {activities.map((e, i) => <ActivityCard key={i} info={e} last={i === (activities.length - 1)}/>)}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}