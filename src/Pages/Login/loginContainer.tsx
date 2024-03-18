import React, {useEffect, useState} from 'react';
import useTokens from '../../Hooks/Auth/useToken';
import {useNavigate} from 'react-router-dom';
import {Button, Grid, Paper, Snackbar, TextField, Typography} from '@mui/material';
import {InputRegex} from '../../Constants/InputsRegex/inputsRegex';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/store";
import {loginUser} from "../../api/fakeApi";


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setTokens, accessToken} = useTokens();
    const [formValues, setFormValues] = useState<any>();
    const [emailError, setEmailError] = useState('');
    const {status, error, user} = useSelector((state: RootState) => state.user);


    const handleInputChange = (key: "email" | "password",
                               event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        key === "email" && setEmailError("")
        setFormValues((prevState: any) => {
            return {...prevState, [key]: event.target.value}
        });
    };


    const validateEmail = (input?: string): boolean => {
        return !!input && InputRegex.email.test(input);
    };

    const handleLogin = (event: any) => {
        event.preventDefault();
        if (!validateEmail(formValues?.email)) {
            setEmailError('Invalid email format');
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


    return <div className="login-page">
        <Grid container justifyContent="center" alignItems="center">
            <Grid sx={{borderRadius: "20px", overflow: "hidden"}} item xs={10} sm={8} md={8} lg={7}>
                <Paper elevation={3} sx={{display: 'flex', alignItems: "stretch", height: "100%"}}>

                    <Grid xs={12} md={6} lg={6}>
                        <div className="image-section">
                            <img src="/login.avif"/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className="form-section">


                            <Typography fontSize={"24px"} component="h2" variant="h4" color={"#5f5eaa"}
                                        className={"title"}>
                                Login
                            </Typography>
                            <form className={"form"} onSubmit={handleLogin}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    error={!!emailError}
                                    helperText={emailError}
                                    autoComplete="email"
                                    size='small'
                                    value={formValues?.email}
                                    onChange={(event) => handleInputChange("email", event)}
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

                                <Typography>Don't have Account?
                                    <Button onClick={() => navigate("/register", {replace: true})}
                                            variant='text'>Sign up</Button></Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={"primary-button"}

                                >
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Snackbar
            open={status == "failed"}
            autoHideDuration={3000}
            message={error}
        />
    </div>
};

export default Login;
