// import {NavLink} from "react-router-dom";

// private Integer id;
// private String positionName;
// private String departmentName;
// private String name;
// private String passport;
// private String status;

export const EmployeeCard = ({employeeInfo, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {employeeInfo.positionName}
            </div>
            <div className="card-body">
                <h5 className="card-title">{employeeInfo.name} </h5>
                <p className="card-text text-truncate">Department: {employeeInfo.departmentName}</p>
                {/*<NavLink to={`/people/${personInfo.id}`} className="btn btn-dark">Details</NavLink>*/}
            </div>
            <div className="card-footer">
                {employeeInfo.status}
            </div>
        </div>
    );
}

export const EmployeeList = () => {

}