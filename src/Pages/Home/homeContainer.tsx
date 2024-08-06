import {useEffect, useState} from "react";
import "./styles.scss";
import {Task} from "./TaskForm/interface";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../Redux/tasksSlice";
import {
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

const Home: React.FC = () => {

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const dispatch = useDispatch();
    const {getParam} = useUrlParams()
    const {t} = useTranslation()
    const {user} = useSelector((state: any) => state.user);
    const {tasks, status} = useSelector((state: any) => state.tasks);
    const {accessToken, clearTokens} = useTokens();


    const filterBy = getParam("filter")

    const filterdTasks = () => {
        return !!filterBy ? tasks?.filter((item) => item?.status == filterBy) : tasks
    }

    useEffect(() => {
       dispatch(fetchStudents(accessToken));
    }, []);

    const handleOpenAddTask = () => {
        setIsAddTaskOpen(true);
    };

    const handleCloseAddTask = () => {
        setIsAddTaskOpen(false);
    };

    const handleAddTask = (task: Task) => {
        dispatch(addTask(task));
    };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (
        <div>

            <Typography fontSize={"1.5rem"} component="h6" variant="h6" color={"#666666"}
            >
                {t('username')}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.fat}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};
export default Home;
