import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ServicesName} from "../Constants/ServicesNames/servicesNames";
import {s} from "vite/dist/node/types.d-FdqQ54oU";


export interface IUserData {
    username: string;
    password: string;
}

export interface IStudent {
    id?:string
    "firstName": string,
    "lastName": string,
    "birthDate": string,
    "grade": string,
    "gender": string,
    "country": string,
    "city": string,
    "phone": string
    "remarks": string
}

interface ILoginResponse {
    token: string;
}


const baseUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: IUserData, {rejectWithValue}) => {
        try {
            const response = await axios.post<ILoginResponse>(`${baseUrl}${ServicesName.SignIn}`, userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred during login');
        }
    }
);


export const fetchStudents = createAsyncThunk(
    'students/getAll',
    async (token: string, {rejectWithValue}) => {
        try {
            const response = await axios.get<IStudent[]>(`${baseUrl}${ServicesName.Students}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while fetching students');
        }
    }
);


export const getStudent = createAsyncThunk(
    'students/get',
    async (token: string, studentId: string, {rejectWithValue}) => {
        try {
            const response = await axios.get<IStudent>(`${baseUrl}${ServicesName.GetStudent}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    id: studentId
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while fetching student');
        }
    }
);

export const addStudent : any= createAsyncThunk(
    'students/add',
    async (token: string, newStudent: any) => {
        try {
            const response = await axios.post<IStudent>(
                `${baseUrl}${ServicesName.AddStudent}`,
                newStudent, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const editStudent = createAsyncThunk(
    'students/edit',
    async (token: string, updatedStudent: IStudent) => {
        try {
            const response = await axios.patch<IStudent>(
                `${baseUrl}${ServicesName.EditStudent}`,
                updatedStudent, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('error', error);
            throw error;
        }
    }
);

export const deleteStudent = createAsyncThunk(
    'students/delete',
    async (token: string, studentId: string) => {
        try {
            await axios.delete(`${baseUrl}${ServicesName.DeleteStudent}`, {
                params: {id: studentId}, headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return studentId;
        } catch (error) {
            console.error('error', error);
            throw error;
        }
    }
);