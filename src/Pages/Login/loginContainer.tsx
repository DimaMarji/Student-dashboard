import React, {useEffect, useState} from 'react';
import useTokens from '../../Hooks/Auth/useToken';
import {useNavigate} from 'react-router-dom';
import {Grid, Paper, Snackbar, TextField, Typography} from '@mui/material';
import {InputRegex} from '../../Constants/InputsRegex/inputsRegex';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/store";
import {loginUser} from "../../api/fakeApi";
import LoginImage from "../../Assets/Images/Login/login-img.png"
import {Button} from "../../Components/Button/index";
import "./styles.scss"


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setTokens, accessToken} = useTokens();
    const [formValues, setFormValues] = useState<any>();
    const [usernameError, setUsernameError] = useState('');
    const {status, error, user} = useSelector((state: RootState) => state.user);


    const handleInputChange = (key: "username" | "password",
                               event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        key === "username" && setUsernameError("")
        setFormValues((prevState: any) => {
            return {...prevState, [key]: event.target.value}
        });
    };


    const validateUsername = (input?: string): boolean => {
        return !!input ;
    };

    const handleLogin = (event: any) => {
        event.preventDefault();
        if (!validateUsername(formValues?.username)) {
            setUsernameError('Invalid username format');
        } else {
              dispatch(loginUser(formValues) as any);
        }
    };

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])

    useEffect(() => {
        if (status === "succeeded" && user) {  
            setTokens(user?.accessToken, user?.accessToken);
        }
    }, [status,user])


    return <div >
        <Grid container className="login-page">

                {/*<Paper elevation={3} sx={{display: 'flex', alignItems: "stretch", height: "100%"}}>*/}

                    <Grid item xs={5} md={5} lg={5}>
                        <div className="image-section">
                            <img src={LoginImage} alt={"login-img"}/>
                        </div>
                    </Grid>
                    <Grid item xs={8} md={8} lg={8} className="form-section">
                        <div className="form-container">


                            <Typography fontSize={"42px"} component="h5" variant="h2" color={"#212224"}
                                        className={"title"}>
                                Login
                            </Typography>
                            <form className={"form"} onSubmit={handleLogin}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    error={!!usernameError}
                                    helperText={usernameError}
                                    autoComplete="username"
                                    size='small'
                                    value={formValues?.username}
                                    onChange={(event) => handleInputChange("username", event)}
                                    className={"textField"}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    size='small'
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formValues?.password}
                                    onChange={(event) => handleInputChange("password", event)}
                                    className={"textField"}
                                />


                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={"login-button"}

                                >
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    </Grid>
                {/*</Paper>*/}
        </Grid>
        <Snackbar
            open={status == "failed"}
            autoHideDuration={3000}
            message={error}
        />
    </div>
};

export default Login;
