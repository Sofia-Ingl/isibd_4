import {useParams} from "react-router-dom";
import {IncidentPageState} from "./IncidentPageState";
import {IncidentPage} from "./IncidentPage";

export const IncidentDetails = ({token})=> {
    let { id } = useParams();

    return (
        <IncidentPageState id={id} token={token}>
            <IncidentPage token={token}/>
        </IncidentPageState>
    );
}