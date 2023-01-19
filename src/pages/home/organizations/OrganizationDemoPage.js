import {useContext, useEffect} from "react";
import {CaseCard} from "../cases/CasesList";
import {ActivityCard} from "../activities/ActivitiesList";
import {OrganizationPageContext} from "./OrganizationPageState";
import {NavLink} from "react-router-dom";


export const OrganizationMembershipCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-body">
                <h5 className="card-title">{(info.personName === null)? "[Unknown]": info.personName} </h5>
                <p className="card-text text-truncate">Role: {info.memberRole}</p>
                <NavLink to={`/people/${info.personId}`} className="btn btn-dark">Person details</NavLink>
            </div>
        </div>
    );
}

export const OrganizationMembershipUpdCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-body">
                <h5 className="card-title">{(info.personName === null)? "[Unknown]": info.personName} </h5>
                <p className="card-text text-truncate">Role: {info.memberRole}</p>
            </div>
        </div>
    );
}

export const OrganizationDemoPage = ()=> {
    const {details, setUpdMode,
        memberships, fetchOrganizationMemberships,
        cases, fetchOrganizationCases,
        activities, fetchOrganizationActivities
    } = useContext(OrganizationPageContext)

    const updateOrganization = ()=> {
        setUpdMode(true)
    }

    useEffect(()=> {
            console.log(memberships)
        },
        // eslint-disable-next-line
        []

    )

    return (
        <div className="container px-5">
            <div className="container w-75">
                <button className="btn btn-light border-dark mb-2" type="button" onClick={updateOrganization}>
                    Update
                </button>
                <div className="card">
                    <div className="card-header bg-dark text-light">
                        Id: {details.id}
                    </div>
                    <div className="card card-body border-dark border-1">
                        <h5 className="card-title">Name</h5>
                        <p className="card-text">{(details.name == null)? "[Unknown]": details.name}</p>
                        <h5 className="card-title">Address</h5>
                        <p className="card-text">{(details.address == null)? "[Unknown]": details.address}</p>

                    </div>
                    <div className="card-footer bg-dark bg-opacity-10">
                        Access level: {details.accessLvl}
                    </div>
                </div>
                <div className="pt-3">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseMemberships" onClick={fetchOrganizationMemberships}>
                        Memberships
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseMemberships">
                    <div className="data-details card card-body overflow-auto">
                        {memberships.map((p, i) => <OrganizationMembershipCard key={i} info={p} last={i === (memberships.length - 1)}/>)}
                    </div>
                </div>

                <div className="pt-3">
                    <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseCases" onClick={fetchOrganizationCases}>
                        Cases
                    </button>
                </div>
                <div className="collapse pt-1" id="collapseCases">
                    <div className="data-details card card-body overflow-auto">
                        {cases.map((p, i) => <CaseCard key={i} info={p} last={i === (cases.length - 1)}/>)}
                    </div>
                </div>

                <div className="mb-3">
                    <div className="pt-3">
                        <button className="container bg-light rounded" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseActivities" onClick={fetchOrganizationActivities}>
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