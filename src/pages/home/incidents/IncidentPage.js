import {useContext} from "react";
import {IncidentPageContext} from "./IncidentPageState";
import {IncidentDemoPage} from "./IncidentDemoPage";
import {IncidentUpdPage} from "./IncidentUpdPage";

export const IncidentPage = ({token}) => {
    const {updMode} = useContext(IncidentPageContext)

    if (!updMode) {
        return (
            <IncidentDemoPage>
            </IncidentDemoPage>
        );
    }
    return (
        <IncidentUpdPage token={token}>
        </IncidentUpdPage>
    );

}