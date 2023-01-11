export const EvidenceCard = ({evidenceInfo, last})=> {
    return (
        <div className={`card ${(last === false)? "mb-4":""}`}>
            <div className="card-header">
                {evidenceInfo.type}
            </div>
            <div className="card-body">
                {/*<h5 className="card-title">Id: {evidenceInfo.id}</h5>*/}
                <p className="card-text">{evidenceInfo.description}</p>
                <p className="card-text">{evidenceInfo.storage}</p>
            </div>
            <div className="card-footer">
                Access level: {evidenceInfo.accessLvl}
            </div>
        </div>
    );
}