import React, {useState} from 'react';
import {
    Box,
    Button,
    Drawer,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import {TaskFormProps} from './interface';
import "./styles.scss"
import {CloseOutlined} from '@mui/icons-material';
import {useAppMediaQuery} from '../../../Hooks/MediaQuery/use-app-media-query';
import {addStudent, IStudent} from '../../../api/fakeApi';
import {useDispatch, useSelector} from 'react-redux';
import useUrlParams from "../../../Hooks/URL/useUrl";


const StudentForm: React.FC<TaskFormProps> = ({open, onClose, onAddTask,studentCurrentData}) => {
    const [formData, setFormData] = useState<IStudent|undefined>(studentCurrentData);

    const dispatch = useDispatch()
    const {status, user} = useSelector((state: any) => state.user);
    const {isTabletOrMobile} = useAppMediaQuery()

    const {getParam} = useUrlParams()
    const actionParam = getParam("action")


    const handleAddStudent = () => {
        const newStudent = {
            ...formData,
            status: "pending",
        };
        dispatch(addStudent(newStudent));
        onAddTask(newStudent);
        setFormData(undefined)
        onClose();
    };

    const formItems = [
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Date of Birth", name: "birthDate" },
        { label: "Educational level", name: "grade" },
        { label: "Gender", name: "gender" },
        { label: "Country", name: "country" },
        { label: "City", name: "city" },
        { label: "Mobile", name: "phone" }
    ];

    const formRowElement = (item1, item2) => (
        <Grid container spacing={2} key={item1.name}>
            <Grid item xs={12} sm={12} md={6}>
                <FormControl required fullWidth margin="normal">
                    <FormLabel>{item1.label}</FormLabel>
                    <TextField value={formData?.[item1.name]} onChange={(event) => setFormData((prevState:any) => ({
                        ...prevState,
                        [item1.name]: event.target.value
                    }))}/>
                </FormControl>
            </Grid>
            {item2 && (
                <Grid xs={12} sm={12} item md={6}>
                    <FormControl required fullWidth margin="normal">
                        <FormLabel>{item2.label}</FormLabel>
                        <TextField value={formData?.[item2.name]} onChange={(event) => setFormData((prevState:any) => ({
                            ...prevState,
                            [item2.name]: event.target.value
                        }))}/>
                    </FormControl>
                </Grid>
            )}
        </Grid>
    );

    const FormComponent = () => {
        const rows = formItems.reduce((result, value, index, array) => {
            if (index % 2 === 0) {
                result.push(array.slice(index, index + 2));
            }
            return result;
        }, []);

        return (
            <div>
                {rows.map(([item1, item2]) => formRowElement(item1, item2))}
            </div>
        );
    };

    const studentFormContent = <div style={{padding: '24px 32px'}} className={"form-component"}>
        <Typography variant="h3" fontWeight={"600"} fontSize={"3rem"} gutterBottom>
            {`${actionParam} Student`}
        </Typography>

        {FormComponent()}
        <FormControl fullWidth margin="normal">
            <FormLabel>Note</FormLabel>
            <TextField
                value={formData?.["remarks"]}
                onChange={(event) => setFormData((prevState:any) => ({
                    ...prevState,
                    "remarks": event.target.value
                }))}
                multiline
                rows={4}
            />

        </FormControl>
        <div className={"buttons-container"}>
        <Button variant="contained" color="primary" className={"primary-button"} onClick={handleAddStudent}>
            {actionParam}
        </Button>
        <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
        </Button>
        </div>
    </div>

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "11px",
        boxShadow: "0px 4px 44px 0px #00000014"

    };


    return (

        <>
            {isTabletOrMobile ?
                <Drawer style={{width:"100vw"}}
                        anchor="right" open={open} onClose={onClose}>
                    <IconButton sx={{marginLeft: "auto", width: "fit-content"}}
                                onClick={onClose}><CloseOutlined/></IconButton>
                    {studentFormContent}

                </Drawer>
                :

                <Modal
                    open={open}
                    onClose={onClose}
                >
                    <Box sx={style} className={"student-form-container"}>
                        {studentFormContent}
                    </Box>

                </Modal>}
        </>
    );
};

export default StudentForm;