import {CaseDemoPage} from "./CaseDemoPage";
import {useContext} from "react";
import {CasePageContext} from "./CasePageState";
import {CaseUpdPage} from "./CaseUpdPage";

export const CasePage = ({token})=> {

    const {updMode} = useContext(CasePageContext)

    if (!updMode) {
        return (
            <CaseDemoPage>
            </CaseDemoPage>
        );
    }
    return (
            <CaseUpdPage token={token}>
            </CaseUpdPage>
        );



}