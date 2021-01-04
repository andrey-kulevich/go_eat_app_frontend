import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AddInvitation = ({open, onClose } : {open: boolean, onClose: any}) => {

    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Новое приглашение</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="ыыыы"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary">
                        Отмена
                    </Button>
                    <Button color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}