import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { InputRegex } from "../../Constants/InputsRegex/inputsRegex";
import { IRegisterForm, RegisterInputsType } from "./interface";
import"./styles.scss"
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {generateUserId} from "../../Helpers/usersHelper";
import {RootState} from "../../Redux/store";
import {registerUser} from "../../api/fakeApi";
import useTokens from "../../Hooks/Auth/useToken";

const Registration = () => {
const navigate=useNavigate()
  const{accessToken}=useTokens()

  const [formValues, setFormValues] = useState<IRegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [formErrors, setFormErrors] = useState<any>({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    usernameError: "",
  });

  const dispatch=useDispatch()
  const { status,user } = useSelector((state: RootState) => state.user);


  const handleInputChange = (
    key: RegisterInputsType,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormErrors((prevErrors:any) => ({ ...prevErrors, [key]: "" }));

    setFormValues((prevState: IRegisterForm) => {
      return { ...prevState, [key]: event.target.value };
    });
  };


  //TODO use YUP instead of this for validation
  const validateEmail = (input?: string): boolean => {
    return !!input && InputRegex.email.test(input);
  };

  const validateUsername = (input?: string): boolean => {
    return !!input && input.length >= 3; // Example validation rule: minimum 3 characters
  };

  const validatePassword = (input?: string): boolean => {
    return !!input && input.length >= 6; // Example validation rule: minimum 6 characters
  };

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    const errors: Partial<IRegisterForm> = {};

    if (!validateUsername(formValues.username)) {
      errors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!validateEmail(formValues?.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!validatePassword(formValues.password)) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    if (isValid) {
      dispatch(registerUser({...formValues,id:generateUserId()}));
    }
  };


  useEffect(()=>{
    if(status==="isSuccess"){
      setTokens(user.accessToken, refreshToken);
    }
  },[status])

  useEffect(()=>{
    if(accessToken){
      navigate("/")
    }
  },[accessToken])


  return (
    <div className="register-page">

<Grid container justifyContent="center" alignItems="center" >
      <Grid sx={{borderRadius:"20px",overflow:"hidden"}} item xs={10} sm={8} md={8} lg={7}>
        <Paper elevation={3} sx={{ display: 'flex',alignItems:"stretch",height:"100%" }}>
        
            <Grid  md={6} lg={6} >
            <div className="image-section">
            <img src="/login.avif"/>
            </div>
                 </Grid>
            <Grid item sm={12} xs={12} md={6} lg={6}>
              <div className="form-section">
          <Typography fontSize={"24px"} component="h2" variant="h4" color={"#5f5eaa"} className={"title"}>
            Registration
          </Typography>
          <form className={"form"} onSubmit={handleRegistration}>
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              error={!!formErrors?.usernameError}
              helperText={formErrors?.usernameError}
              autoComplete="username"
              value={formValues.username}
              onChange={(event) => handleInputChange("username", event)}
              className={"textField"}
            />
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={!!formErrors.emailError}
              helperText={formErrors?.emailError}
              autoComplete="email"
              value={formValues.email}
              onChange={(event) => handleInputChange("email", event)}
              className={"textField"}
            />
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={!!formErrors?.passwordError}
              helperText={formErrors?.passwordError}
              autoComplete="new-password"
              value={formValues.password}
              onChange={(event) => handleInputChange("password", event)}
              className={"textField"}
            />
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              error={!!formErrors?.confirmPasswordError}
              helperText={formErrors?.confirmPasswordError}
              autoComplete="new-password"
              value={formValues.confirmPassword}
              onChange={(event) => handleInputChange("confirmPassword", event)}
              className={"textField"}
            />

<Typography>Already have Account? <Button variant='text'
onClick={()=>navigate("/login",{replace:true})}>Sign in</Button></Typography>
       
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={"primary-button"}
            >
              Sign Up
            </Button>
          </form>
              </div>
            </Grid>
        </Paper>
      </Grid>
    </Grid>

    </div>
  );
};

export default Registration;
