import {useContext} from "react";
import {OrganizationDemoPage} from "./OrganizationDemoPage";
import {OrganizationPageContext} from "./OrganizationPageState";
import {OrganizationUpdPage} from "./OrganizationUpdPage";

export const OrganizationPage = ({token}) => {
    const {updMode} = useContext(OrganizationPageContext)

    if (!updMode) {
        return (
            <OrganizationDemoPage>
            </OrganizationDemoPage>
        );
    }
    return (
        <OrganizationUpdPage token={token}>
        </OrganizationUpdPage>
    );

}