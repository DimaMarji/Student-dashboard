import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import"./styles.scss"

const Error500Page:React.FC=()=>{
    const navigate=useNavigate()
    return<div className="error-404">
        <img src="/error500.jpg"/>
        <Button 
        variant="contained"
              color="primary"
              className={"primary-button"}
               onClick={() => {
                                navigate("/")
                            }} >Go to home page</Button>
                    
    </div>
}

export default Error500Page