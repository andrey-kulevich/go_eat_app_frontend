import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface CustomSnackbarInterface {
    open: boolean,
    handleClose: Function,
    message: string,
    kind: "success" | "error" | "warning" | "info"
}

export default function CustomSnackbar({open, kind, handleClose, message}:CustomSnackbarInterface) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose()}>
            <Alert onClose={() => handleClose()} severity={kind}>
                {message}
            </Alert>
        </Snackbar>
    );
}
