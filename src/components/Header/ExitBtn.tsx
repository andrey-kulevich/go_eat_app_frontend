import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {UserContext} from "../../context/UserProvider";

const useStyles = makeStyles(() =>
    createStyles({
        btn:{
            color:'#fff'
        }
    }),
);

export const ExitBtn = () => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const {setIsAuth} = useContext(UserContext)

    const handleClickOpen = () => {setOpen(true);};

    const handleClose = () => {setOpen(false);};

    return (
        <div>
            <Button
                color="inherit"
                className={classes.btn}
                onClick={handleClickOpen}
            >
                Выйти
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Вы уверены, что хотите выйти из аккуаунта?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Нет
                    </Button>
                    <Button
                        onClick={() => {
                            setIsAuth(false)
                            localStorage.clear()}
                        }
                        color="primary"
                        autoFocus
                    >
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
