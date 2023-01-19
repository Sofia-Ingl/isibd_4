import React from "react";

export const AttachAccordion = ({
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




export const AddAccordion = ({
                                 entityName,
                                 entityLst,
                                 dealEntityDeleteLstFunc,
                                 EntityCard,
                                 EntityForm,
                                 manageNewEntitiesLstFunc,
                                 newEntitiesLst
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
                            aria-expanded="false" aria-controls={`collapseTwo${entityName}`}>
                        Add {entityName}
                    </button>
                </h2>
                <div id={`collapseTwo${entityName}`} className="accordion-collapse collapse"
                     aria-labelledby={`headingTwo${entityName}`} data-bs-parent={`#accordion${entityName}`}>
                    <div className="accordion-body">


                        <div className="data-details card card-body overflow-auto">
                            {newEntitiesLst.map((p, i) =>
                                <div key={i} className="row">
                                    <div className="col">
                                        <EntityCard info={p} last={i === (newEntitiesLst.length - 1)}/>
                                    </div>
                                </div>)}
                        </div>

                        <div className="pt-4">
                            <h5>Add {entityName}</h5>
                        </div>
                        <div className="p-3 border border-1 border-dark rounded">
                            <EntityForm onSubmitFunc={manageNewEntitiesLstFunc}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>)
}



export const AddWithAttachAccordion = ({
                                 entityName,
                                 entityLst,
                                 dealEntityDeleteLstFunc,
                                 dealEntityAddLstFunc,
                                 potentialBasicEntities,
                                 getAllExceptBasicEntities,
                                 networkWrapper,
                                 BasicEntityCard,
                                 EntityCard,
                                extraDataLst
                             })=> {

    //
    // let roles = []
    // for (let i = 0; i < potentialBasicEntities.length; i++) {
    //     roles.push('')
    // }

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
                            onClick={()=> {networkWrapper(getAllExceptBasicEntities)}}>
                        Add {entityName}
                    </button>
                </h2>
                <div id={`collapseTwo${entityName}`} className="accordion-collapse collapse"
                     aria-labelledby={`headingTwo${entityName}`} data-bs-parent={`#accordion${entityName}`}>
                    <div className="accordion-body">


                        <div className="data-details card card-body overflow-auto">
                            {potentialBasicEntities.map((p, i) =>
                                <div key={i} className="row">
                                    <div className="col-1">
                                        <input className="form-check-input"
                                               id = {`inputCheck_${i}`}
                                               type="checkbox"
                                               value={`${p.id}`}
                                               defaultChecked={false}
                                               onChange={e => {
                                                   dealEntityAddLstFunc(e.target)
                                                   // dealEntityAddLstFunc(e.target, roles[parseInt(e.target.id.split("_")[1])])
                                               }}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <div className={`border border-1 rounded p-2 ${(i === (potentialBasicEntities.length - 1))? "":"mb-3"}`}>
                                            <BasicEntityCard info={p} last={true}/>
                                            <div className="mb-2">
                                                <label htmlFor={`inputRole_${i}`} className="form-label">Role</label>
                                                <input type="text"
                                                       className="form-control"
                                                       id={`inputRole_${i}`}
                                                       onChange={e => {
                                                           extraDataLst[i] = e.target.value
                                                           //roles[parseInt(e.target.id.split("_")[1])] = e.target.value
                                                       }}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>)}
                        </div>


                    </div>
                </div>
            </div>
        </div>)
}