import { Container, Grid } from "@mui/material";
import { ISharedLayoutProps } from "../interface";
import SharedNavbar from "./SharedNavbar/sharedNavbar";
import "./styles.scss";
import Sidebar from "./SharedSidbar/sharedSidbar";
import { useEffect } from "react";
import useTokens from "../../Hooks/useToken";
import { useNavigate } from "react-router-dom";

const SharedLayout: React.FC<ISharedLayoutProps> = ({ children }) => {
  const { accessToken } = useTokens();
 const navigate =useNavigate()
  
  useEffect(()=>{
    if(!accessToken){
        navigate("/login",{replace:true})
    }
},[accessToken])

  return (
    <div>
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
    </Grid>
  </div>
  );
};
export default SharedLayout;
