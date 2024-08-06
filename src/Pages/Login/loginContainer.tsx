import React, {useEffect, useState} from 'react';
import useTokens from '../../Hooks/Auth/useToken';
import {useNavigate} from 'react-router-dom';
import {FormControl, Grid, MenuItem, Select, Snackbar, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/store";
import {IUserData, loginUser} from "../../api/fakeApi";
import LoginImage from "../../Assets/Images/Login/login-img.png"
import {Button} from "../../Components/Button/index";
import "./styles.scss"
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../Context/Language/LanguageContext";
import {CultureCode} from "../../Constants/Language/cultureCode";


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()
    const {cultureCode, switchLanguage} = useLanguage();
    const {setTokens, accessToken} = useTokens();

    const [formValues, setFormValues] = useState<IUserData>();
    const [usernameError, setUsernameError] = useState('');
    const {status, error, user} = useSelector((state: RootState) => state.user);


    const handleInputChange = (key: "username" | "password",
                               event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        key === "username" && setUsernameError("")
        setFormValues((prevState: any) => {
            return {...prevState, [key]: event.target.value}
        });
    };


    const handleLogin = (event: any) => {
        event.preventDefault();
            dispatch(loginUser(formValues) as any);
    };

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])



    useEffect(() => {
        if (status === "succeeded" && user) {
            setTokens(user?.token, user?.token);
        }
    }, [status, user])


    return <div>
        <Grid container className="login-page" direction={cultureCode?'row-reverse':"row"}>
            <Grid item xs={5} md={5} lg={5}>

                <FormControl fullWidth>
                    <Select
                        className={"lang-select"}
                        value={cultureCode}
                        onChange={(event) => {
                            switchLanguage(event?.target?.value)
                        }}
                    >
                        <MenuItem value={CultureCode.EN}>English</MenuItem>
                        <MenuItem value={CultureCode.AR}>العربية</MenuItem>
                    </Select>
                </FormControl>

                <div className="image-section">
                    <img src={LoginImage} alt={"login-img"}/>
                </div>
            </Grid>
            <Grid item xs={8} md={8} lg={8} className="form-section">
                <div className="form-container">


                    <Typography fontSize={"3.438rem"} component="h5" variant="h2" color={"#212224"}
                                className={"title"}>
                        {t('login')}
                    </Typography>
                    <form className={"form"} onSubmit={handleLogin}>
                        <div className={"form-item"}>
                            <Typography fontSize={"1.5rem"} component="h6" variant="h6" color={"#666666"}
                            >
                                {t('username')}
                            </Typography>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                name="username"
                                error={!!usernameError}
                                helperText={usernameError}
                                size='small'
                                value={formValues?.username}
                                onChange={(event) => handleInputChange("username", event)}
                                className={"textField"}
                            />
                        </div>
                        <div className={"form-item"}>
                            <Typography fontSize={"1.5rem"} component="h6" variant="h6" color={"#666666"}
                            >
                                {t('password')}
                            </Typography>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                size='small'
                                name="password"
                                // label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formValues?.password}
                                onChange={(event) => handleInputChange("password", event)}
                                className={"textField"}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={"login-button"}

                        >
                            {t('signIn')}

                        </Button>
                    </form>
                </div>
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
