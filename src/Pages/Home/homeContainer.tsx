import {useEffect, useState} from "react";
import "./styles.scss";
import {Task} from "./TaskForm/interface";
import {useDispatch, useSelector} from "react-redux";
import {addStudentAction} from "../../Redux/tasksSlice";
import {
    Button, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow, Typography
} from "@mui/material";
import {fetchStudents} from "../../api/fakeApi";
import useUrlParams from "../../Hooks/URL/useUrl";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import * as React from "react";
import {useTranslation} from "react-i18next";
import useTokens from "../../Hooks/Auth/useToken";
import {StudentForm} from "./StudentForm";
import {useLanguage} from "../../Context/Language/LanguageContext";
import {Delete, Edit} from "@mui/icons-material";



const getTranslation = (translations, cultureCode) => {
    const translation = translations.find(t => t.cultureCode === cultureCode);
    return translation ? translation.name : '';
};

const Home: React.FC = () => {

    const {getParam,addParam} = useUrlParams()
    const filterBy = getParam("filter")
    const actionParam = getParam("action")

    const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(!!actionParam);
    const dispatch = useDispatch();

    const {t} = useTranslation()
    const {user} = useSelector((state: any) => state.user);
    const {tasks, status} = useSelector((state: any) => state.tasks);
    const {accessToken, clearTokens} = useTokens();


    const filterdTasks = () => {
        return !!filterBy ? tasks?.filter((item) => item?.status == filterBy) : tasks
    }

    useEffect(() => {
       dispatch(fetchStudents(accessToken));
    }, []);

    const handleOpenAddTask = () => {
        addParam("action", "Add")
        setIsAddTaskOpen(true);
    };

    const handleCloseAddTask = () => {
        setIsAddTaskOpen(false);
    };

    const handleAddTask = (task: Task) => {
        dispatch(addStudentAction(task));
    };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const {cultureCode, switchLanguage} = useLanguage();

    const handleEdit=(row)=>{

    }
    const handleDelete=(row)=>{

    }

    const rows = [
        {
            "id": "30a0d7bd-f78b-4562-d033-08dcacac23e1",
            "firstName": "Student",
            "lastName": "001",
            "birthDate": "2000-11-07T00:00:00",
            "grade": {
                "id": "42fd7157-0b75-4184-a0f8-efceb52bb4a7",
                "translations": [
                    {
                        "name": "Grade 8",
                        "cultureCode": 0
                    },
                    {
                        "name": "الصف الثامن",
                        "cultureCode": 1
                    }
                ]
            },
            "gender": {
                "id": "408a14d0-fb95-4df0-a0d4-9042dc52ad4f",
                "translations": [
                    {
                        "name": "ذكر",
                        "cultureCode": 1
                    },
                    {
                        "name": "Male",
                        "cultureCode": 0
                    }
                ]
            },
            "country": "Syria",
            "city": "Aleppo",
            "phone": "9637421412",
            "remarks": "user for  test"
        },
        {
            "id": "aa86470f-c6a8-47ac-d034-08dcacac23e1",
            "firstName": "Student",
            "lastName": "002",
            "birthDate": "2000-01-07T00:00:00",
            "grade": {
                "id": "5b7d2349-d5e1-406d-a9ee-2b6b03b9bdbf",
                "translations": [
                    {
                        "name": "Grade 9",
                        "cultureCode": 0
                    },
                    {
                        "name": "الصف التاسع",
                        "cultureCode": 1
                    }
                ]
            },
            "gender": {
                "id": "408a14d0-fb95-4df0-a0d4-9042dc52ad4f",
                "translations": [
                    {
                        "name": "ذكر",
                        "cultureCode": 1
                    },
                    {
                        "name": "Male",
                        "cultureCode": 0
                    }
                ]
            },
            "country": "Syria",
            "city": "Aleppo",
            "phone": "9637421412",
            "remarks": "user for  test"
        },
        {
            "id": "f634070c-3eb7-4ce1-d035-08dcacac23e1",
            "firstName": "Student",
            "lastName": "003",
            "birthDate": "2005-01-07T00:00:00",
            "grade": {
                "id": "f195fb8f-ab61-48be-98ac-9cadb8973276",
                "translations": [
                    {
                        "name": "Grade 6",
                        "cultureCode": 0
                    },
                    {
                        "name": "الصف السادس",
                        "cultureCode": 1
                    }
                ]
            },
            "gender": {
                "id": "be9f259f-ca22-4184-bb05-0fd4c0bd9e87",
                "translations": [
                    {
                        "name": "أنثى",
                        "cultureCode": 1
                    },
                    {
                        "name": "Female",
                        "cultureCode": 0
                    }
                ]
            },
            "country": "Syria",
            "city": "Aleppo",
            "phone": "9637421412",
            "remarks": "user for  test"
        },
        {
            "id": "4974ccf8-a675-4ee6-d036-08dcacac23e1",
            "firstName": "Student",
            "lastName": "004",
            "birthDate": "2004-11-07T00:00:00",
            "grade": {
                "id": "87167109-ebea-4015-a18b-778606ba9a8a",
                "translations": [
                    {
                        "name": "Grade 1",
                        "cultureCode": 0
                    },
                    {
                        "name": "الصف للاول",
                        "cultureCode": 1
                    }
                ]
            },
            "gender": {
                "id": "408a14d0-fb95-4df0-a0d4-9042dc52ad4f",
                "translations": [
                    {
                        "name": "ذكر",
                        "cultureCode": 1
                    },
                    {
                        "name": "Male",
                        "cultureCode": 0
                    }
                ]
            },
            "country": "Syria",
            "city": "Aleppo",
            "phone": "9637421412",
            "remarks": "user for  test"
        },
        {
            "id": "ab2a387b-9aaf-4f16-d037-08dcacac23e1",
            "firstName": "Student",
            "lastName": "005",
            "birthDate": "2006-03-07T00:00:00",
            "grade": {
                "id": "87167109-ebea-4015-a18b-778606ba9a8a",
                "translations": [
                    {
                        "name": "Grade 1",
                        "cultureCode": 0
                    },
                    {
                        "name": "الصف للاول",
                        "cultureCode": 1
                    }
                ]
            },
            "gender": {
                "id": "be9f259f-ca22-4184-bb05-0fd4c0bd9e87",
                "translations": [
                    {
                        "name": "أنثى",
                        "cultureCode": 1
                    },
                    {
                        "name": "Female",
                        "cultureCode": 0
                    }
                ]
            },
            "country": "Syria",
            "city": "Aleppo",
            "phone": "9637421412",
            "remarks": "user for  test"
        },
        {
            "id": "2b5ad59e-82e8-48ef-d038-08dcacac23e1",
            "firstName": "Student",
            "lastName": "006",
            "birthDate": "2010-01-07T00:00:00",
            "grade": {
                "id": "87167109-ebea-4015-a18b-778606ba9a8a",
                "translations": [
                    {
                        "name": "Grade 1",
                        "cultureCode": 0
                    },
                    {
                        "name": "الصف للاول",
                        "cultureCode": 1
                    }
                ]
            },
            "gender": {
                "id": "408a14d0-fb95-4df0-a0d4-9042dc52ad4f",
                "translations": [
                    {
                        "name": "ذكر",
                        "cultureCode": 1
                    },
                    {
                        "name": "Male",
                        "cultureCode": 0
                    }
                ]
            },
            "country": "Syria",
            "city": "Aleppo",
            "phone": "9637421412",
            "remarks": "user for  test"
        }
    ];


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div>

            <Button color={"primary"} variant={"contained"} onClick={()=>handleOpenAddTask()}>AddStudent</Button>

            <Typography fontSize={"1.5rem"} component="h6" variant="h6" color={"#666666"}
            >
                {t('username')}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{new Date(row.birthDate).toLocaleDateString()}</TableCell>
                                <TableCell>{getTranslation(row.grade.translations, cultureCode)}</TableCell>
                                <TableCell>{getTranslation(row.gender.translations, cultureCode)}</TableCell>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.remarks}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={9} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={9}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <StudentForm open={isAddTaskOpen} onClose={handleCloseAddTask} onAddTask={handleAddTask}/>
        </div>
    );
};
export default Home;
