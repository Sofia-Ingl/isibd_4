import {useContext} from "react";
import {PersonDemoPage} from "./PersonDemoPage";
import {PersonPageContext} from "./PersonPageState";
import {PersonUpdPage} from "./PersonUpdPage";

export const PersonPage = ({token}) => {
    const {updMode} = useContext(PersonPageContext)

    if (!updMode) {
        return (
            <PersonDemoPage>
            </PersonDemoPage>
        );
    }
    return (
        <PersonUpdPage token={token}>
        </PersonUpdPage>
    );

}