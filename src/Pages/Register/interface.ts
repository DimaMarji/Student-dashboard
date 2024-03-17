
export interface IRegisterForm{
    email?:string,
    password?:string
    confirmPassword?:string
    username?:string
  }

  export type RegisterInputsType='username' | 'email' | 'password' | 'confirmPassword'