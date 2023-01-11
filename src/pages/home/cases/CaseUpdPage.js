import React, {useContext, useState} from "react";
import {CasePageContext} from "./CasePageState";

export const CaseUpdPage = ()=> {

    const {details} = useContext(CasePageContext)

    const submitHandler = async (event) => {
        event.preventDefault()
    }

    const [temporalName, setTemporalName] = useState(details.name)

    return (
        <div className="container px-5">
            <div className="container w-75 ">
                <div className="mb-3">
                    <button type="button" className="btn btn-dark" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg> Cancel
                    </button>
                </div>

                <div className="p-2 border border-1 border-dark rounded">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="inputLogin" className="form-label">Name</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputLogin"
                                   value={temporalName}
                                   onChange={e => setTemporalName(e.target.value)}/>
                        </div>

                        <button type="submit" className="btn btn-dark" >Submit</button>
                    </form>
                </div>

        </div>
        </div>
);

}