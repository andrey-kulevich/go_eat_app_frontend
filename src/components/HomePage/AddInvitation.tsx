import React, {ChangeEvent, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Checkbox,
    createStyles,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select, Typography
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: '40%',
            marginRight: theme.spacing(2)
        },
        or: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        button: {
            padding: 0,
            marginBottom: theme.spacing(2)
        },
        updateButton: {
            height: '80%',
            paddingTop: '20px'
        },
        valueField: {
            flexGrow: 1
        }
    }),
);

export const AddInvitation = ({open, onClose } : {open: boolean, onClose: any}) => {

    const classes = useStyles();
    const [selectValue, setSelectValue] = useState<string>('')
    const [whoWillPay, setWhoWillPay] = useState<boolean>(false)
    const [dateTime, setDateTime] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [isLoginExist, setIsLoginExist] = useState<boolean>(true)
    const [isCreateNewAddress, setIsCreateNewAddress] = useState<boolean>(false)

    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Новое приглашение</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="datetime"
                        label="Дата и время встречи"
                        type="datetime-local"
                        onChange={(e) =>
                            setDateTime(e.target.value.replace('T', ' '))
                        }
                        fullWidth
                    />

                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                    >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Фильтровать места по</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={filterOn}
                                onChange={(e) =>
                                    setSelectValue(e.target.value as string)
                                }
                            >
                                <MenuItem key={1} value={'country'}>Страна</MenuItem>
                                <MenuItem key={2} value={'region'}>Область</MenuItem>
                                <MenuItem key={3} value={'town'}>Город</MenuItem>
                                <MenuItem key={4} value={'street'}>Улица</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Значение"
                            //value={filterValue}
                            className={classes.valueField}
                            //onChange={handleFilterValueChange}
                        />
                        <Button
                            color={'primary'}
                            //onClick={()=>setUpdate(true)}
                            className={classes.updateButton}
                        >
                            Обновить
                        </Button>
                    </Grid>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Место</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={filterOn}
                            //onChange={}
                        >
                            <MenuItem key={1} value={'country'}>Страна</MenuItem>
                            <MenuItem key={2} value={'region'}>Область</MenuItem>
                            <MenuItem key={3} value={'town'}>Город</MenuItem>
                            <MenuItem key={4} value={'street'}>Улица</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography className={classes.or}>ИЛИ</Typography>

                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={() => setIsCreateNewAddress(!isCreateNewAddress)}
                    >
                        Создать новое место
                    </Button>
                    <br/>

                    {isCreateNewAddress ?
                        <>
                            'aaaa'
                            <br/>
                        </>
                        : ''}

                    <FormControlLabel
                        control={<Checkbox
                            checked={whoWillPay}
                            onChange={() => {setWhoWillPay(!whoWillPay)}}
                            color={"primary"}
                        />}
                        label="Я буду платить"
                    />
                    <TextField
                        margin="dense"
                        id="message"
                        label="Сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="recipientLogin"
                        error={!isLoginExist}
                        label="Логин получателя (необязательное поле)"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary"> Отмена </Button>
                    <Button color="primary"> Создать </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}