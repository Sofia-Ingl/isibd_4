export const EvidenceCard = ({info, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {info.type}
            </div>
            <div className="card-body">
                {/*<h5 className="card-title">Id: {evidenceInfo.id}</h5>*/}
                <p className="card-text">{info.description}</p>
                <p className="card-text">{info.storage}</p>
            </div>
            <div className="card-footer">
                Access level: {info.accessLvl}
            </div>
        </div>
    );
}