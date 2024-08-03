import "./styles.scss"
import {Button as MuiButton}  from '@mui/material';
import {IButtonProps} from "./interface";
import * as React from "react";

const Button:React.FC<IButtonProps>=({className,...props})=>{
    return <MuiButton className={`default-button ${className ?? ""}`} {...props}/>
}

export default Button