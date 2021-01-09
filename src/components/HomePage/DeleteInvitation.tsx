import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {requests} from "../../helpers/requests";
import {useHttp} from "../../hooks/useHttp";


export const DeleteInvitation = ({invitationId, open, onClose}:{invitationId: number, open: boolean, onClose: any}) => {

    const {request} = useHttp()

    const handleDeleteInvitation = () => {
        request(requests.deleteInvitation.url(invitationId), requests.deleteInvitation.method, null)
            .catch(err => console.log(err))
        onClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Удалить приглашение?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary"> Отмена </Button>
                    <Button color="primary" onClick={handleDeleteInvitation}> Да </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}