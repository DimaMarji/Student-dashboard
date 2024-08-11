import {Box, Modal} from "@mui/material";
import * as React from "react";

const SignOutModal: React.FC = ({open, onClose}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "11px",
        boxShadow: "0px 4px 44px 0px #00000014"

    };

    return <Modal
        open={open}
        onClose={onClose}
    >
        <Box sx={style}>

        </Box>

    </Modal>
}