import {Grid} from "@mui/material";
import {ISharedLayoutProps} from "../interface";
import "./styles.scss";
import Sidebar from "./SharedSidbar/sharedSidbar";
import {useEffect} from "react";
import useTokens from "../../Hooks/Auth/useToken";
import {useNavigate} from "react-router-dom";
import {useAppMediaQuery} from "../../Hooks/MediaQuery/use-app-media-query";
import { useDispatch } from "react-redux";
import { getUser, loginUser } from "../../api/fakeApi";
import SharedNavbar from "./SharedNavbar/sharedNavbar";
import {useLanguage} from "../../Context/Language/LanguageContext";
import { languageMap } from "../../Constants/Language/cultureCode";

const SharedLayout: React.FC<ISharedLayoutProps> = ({children}) => {
    const {accessToken,clearTokens} = useTokens();
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {isTabletOrMobile} = useAppMediaQuery()
    const {cultureCode, switchLanguage} = useLanguage();

    useEffect(() => {
        if (!accessToken) {
            navigate("/login", {replace: true})
        }
        else
        dispatch(getUser(accessToken) as any);
    }, [accessToken])

    return (
        <div className={`lang-${languageMap[cultureCode]}`}>
            <SharedNavbar/>
            <Grid container direction={cultureCode?'row-reverse':"row"}>

                <Grid item xs={!isTabletOrMobile ? 2 : 0}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={!isTabletOrMobile ? 10 : 12}>
                    {children}
                </Grid>
            </Grid>
        </div>
    );
};
export default SharedLayout;
