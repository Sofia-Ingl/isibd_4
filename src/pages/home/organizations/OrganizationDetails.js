import {useParams} from "react-router-dom";
import {OrganizationPageState} from "./OrganizationPageState";
import {OrganizationPage} from "./OrganizationPage";

export const OrganizationDetails = ({token})=> {
    let { id } = useParams();

    return (
        <OrganizationPageState id={id} token={token}>
            <OrganizationPage token={token}/>
        </OrganizationPageState>
    );
}