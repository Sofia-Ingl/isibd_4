import {useParams} from "react-router-dom";
import {CasePageState} from "./CasePageState";
import {CasePage} from "./CasePage";

export const CaseDetails = ({token})=> {
    let { id } = useParams();

    return (
        <CasePageState id={id} token={token}>
            <CasePage token={token}></CasePage>
        </CasePageState>
    );
}
