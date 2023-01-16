import {useParams} from "react-router-dom";
import {PersonPageState} from "./PersonPageState";
import {PersonPage} from "./PersonPage";

export const PersonDetails = ({token})=> {
    let { id } = useParams();

    return (
        <PersonPageState id={id} token={token}>
            <PersonPage token={token}/>
        </PersonPageState>
    );
}