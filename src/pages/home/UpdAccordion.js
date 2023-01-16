import React from "react";

export const UpdAccordion = ({
                          entityName,
                          entityLst,
                          dealEntityDeleteLstFunc,
                          dealEntityAddLstFunc,
                          potentialEntities,
                          getAllExceptEntities,
                          networkWrapper,
                          EntityCard
                      })=> {


    return (
        <div className="accordion mb-3" id={`accordion${entityName}`}>

            <div className="accordion-item border-dark border-2">
                <h2 className="accordion-header" id={`headingOne${entityName}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={`#collapseOne${entityName}`} aria-expanded="true"
                            aria-controls={`collapseOne${entityName}`}>
                        {entityName}
                    </button>
                </h2>
                <div id={`collapseOne${entityName}`} className="accordion-collapse collapse"
                     aria-labelledby={`headingOne${entityName}`} data-bs-parent={`#accordion${entityName}`}>
                    <div className="accordion-body">

                        <div className="data-details card card-body overflow-auto">
                            {entityLst.map((p, i) =>
                                <div key={i} className="row">
                                    <div className="col-1">
                                        <input className="form-check-input"
                                               type="checkbox"
                                               value={`${p.id}`}
                                               defaultChecked={true}
                                               onChange={e => dealEntityDeleteLstFunc(e.target)}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <EntityCard info={p} last={i === (entityLst.length - 1)}/>
                                    </div>
                                </div>)}
                        </div>


                    </div>
                </div>
            </div>
            <div className="accordion-item border-dark border-2">
                <h2 className="accordion-header" id={`headingTwo${entityName}`}>
                    <button className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target={`#collapseTwo${entityName}`}
                            aria-expanded="false" aria-controls={`collapseTwo${entityName}`}
                            onClick={()=> {networkWrapper(getAllExceptEntities)}}>
                        Add {entityName}
                    </button>
                </h2>
                <div id={`collapseTwo${entityName}`} className="accordion-collapse collapse"
                     aria-labelledby={`headingTwo${entityName}`} data-bs-parent={`#accordion${entityName}`}>
                    <div className="accordion-body">


                        <div className="data-details card card-body overflow-auto">
                            {potentialEntities.map((p, i) =>
                                <div key={i} className="row">
                                    <div className="col-1">
                                        <input className="form-check-input"
                                               type="checkbox"
                                               value={`${p.id}`}
                                               defaultChecked={false}
                                               onChange={e => dealEntityAddLstFunc(e.target)}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <EntityCard info={p} last={i === (potentialEntities.length - 1)}/>
                                    </div>
                                </div>)}
                        </div>


                    </div>
                </div>
            </div>
        </div>)
}