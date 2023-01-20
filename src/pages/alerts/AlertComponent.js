import {useContext} from "react";
import {AlertContext} from "./AlertState";

export const AlertComponent = ()=> {

    // eslint-disable-next-line
    const {hidden, message, setHidden} = useContext(AlertContext)

    // eslint-disable-next-line

    // let visibilityState = hidden ? "hidden":"visible";

    let visibilityState = hidden ? "none":"block";

    return (
        <div className="container px-5 mx-2">
        <div className={`w-75 alert alert-warning mx-auto`}  style={{display: visibilityState}}>

            <strong>
                Warning!
            </strong>
            <p>
                {message}
            </p>
            <button className="btn btn-dark text-warning" onClick={()=>setHidden(true)}>Close</button>
        </div>
        </div>
    )
}