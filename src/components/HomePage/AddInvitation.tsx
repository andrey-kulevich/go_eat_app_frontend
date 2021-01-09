import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
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
import {requests} from "../../helpers/requests";
import {useHttp} from "../../hooks/useHttp";
import {PlaceInterface} from "../../interfaces/PlaceInterface";
import {UserContext} from "../../context/UserProvider";

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
        },
        grid: {
            width: '40%',
            marginRight: theme.spacing(2)
        }
    }),
);

export const AddInvitation = ({open, onClose } : {open: boolean, onClose: any}) => {

    const classes = useStyles();
    const {user} = useContext(UserContext)
    const {request} = useHttp()
    const [update, setUpdate] = useState<boolean>(true)
    const [selectFilterValue, setSelectFilterValue] = useState<string>('country')
    const [filterValue, setFilterValue] = useState<string>('Россия')
    const [whoWillPay, setWhoWillPay] = useState<boolean>(false)
    const [dateTime, setDateTime] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [recipientId, setRecipientId] = useState<number>(0)
    const [isCreateNewAddress, setIsCreateNewAddress] = useState<boolean>(false)
    const [places, setPlaces] = useState<PlaceInterface[]>([])
    const [selectedPlace, setSelectedPlace] = useState<number>(0)

    const [country, setCountry] = useState<string>('')
    const [region, setRegion] = useState<string>('')
    const [town, setTown] = useState<string>('')
    const [mailIndex, setMailIndex] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [house, setHouse] = useState<string>('')
    const [apartment, setApartment] = useState<string>('')
    const [name, setName] = useState<string>('')

    useEffect(() => {
        request(requests.getPlacesByLocationAndPreferences
                .url(selectFilterValue, filterValue, 'null', 'null'),
            requests.getPlacesByLocationAndPreferences.method, null)
            .then(data => {setPlaces(data as PlaceInterface[])})

        setUpdate(false)
    }, [update])

    const auxiliaryCreate = (selected: number) => {
        if (login === '') {
            request(requests.createInvitation.url, requests.createInvitation.method, {
                "DateTime": dateTime,
                "Address": selected,
                "WhoWillPay": whoWillPay ? 1 : 0,
                "Message": message,
                "SenderId": user.id,
                "RecipientId": -1
            }).then(res => console.log(res))
                .catch(err => console.log(err))
        } else {
            request(requests.createInvitation.url, requests.createInvitation.method, {
                "DateTime": dateTime,
                "Address": selected,
                "WhoWillPay": whoWillPay ? 1 : 0,
                "Message": message,
                "SenderId": user.id,
                "RecipientId": recipientId
            }).then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }

    const createInvitation = () => {
        if (isCreateNewAddress) {
            request(requests.createEmptyPlace.url, requests.createEmptyPlace.method, {
                "Name": name,
                "Country": country,
                "Region": region,
                "Town": town,
                "MailIndex": mailIndex,
                "Street": street,
                "House": house,
                "Apartment": apartment
            }).then(res => auxiliaryCreate(res))
                .catch(err => console.log(err))
        } else {
            auxiliaryCreate(selectedPlace)
        }
        onClose()
    }

    const handleSetRecipient = (event : ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value as string)

        request(requests.getUserByLogin.url(event.target.value as string),
            requests.getUserByLogin.method, null).then(data => {setRecipientId(data.id)})
    }

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
                        <FormControl className={classes.formControl} disabled={isCreateNewAddress}>
                            <InputLabel id="demo-simple-select-label">Фильтровать места по</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectFilterValue}
                                onChange={(e) =>
                                    setSelectFilterValue(e.target.value as string)
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
                            value={filterValue}
                            disabled={isCreateNewAddress}
                            className={classes.valueField}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                        <Button
                            color={'primary'}
                            disabled={isCreateNewAddress}
                            onClick={() => setUpdate(true)}
                            className={classes.updateButton}
                        >
                            Обновить
                        </Button>
                    </Grid>

                    <FormControl className={classes.formControl} disabled={isCreateNewAddress}>
                        <InputLabel id="demo-simple-select-label">Место</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPlace}
                            onChange={(e) => setSelectedPlace(e.target.value as number)}
                        >
                            {places.length > 0 ?
                                (places.map(((item, index) =>
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))) : ''}
                        </Select>
                    </FormControl>

                    <Typography className={classes.or}>ИЛИ</Typography>

                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={() => setIsCreateNewAddress(!isCreateNewAddress)}
                    >
                        {isCreateNewAddress ? 'Скрыть' : 'Создать новое место'}
                    </Button>
                    <br/>

                    {isCreateNewAddress ?
                        <>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                            >
                                <TextField
                                    id="name"
                                    label="Название"
                                    className={classes.grid}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    id="country"
                                    label="Страна"
                                    className={classes.grid}
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                            >
                                <TextField
                                    id="region"
                                    label="Область"
                                    className={classes.grid}
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                />
                                <TextField
                                    id="town"
                                    label="Город"
                                    className={classes.grid}
                                    value={town}
                                    onChange={(e) => setTown(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                            >
                                <TextField
                                    id="mail_index"
                                    label="Почтовый индекс"
                                    className={classes.grid}
                                    value={mailIndex}
                                    onChange={(e) => setMailIndex(e.target.value)}
                                />
                                <TextField
                                    id="street"
                                    label="Улица"
                                    className={classes.grid}
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                            >
                                <TextField
                                    id="house"
                                    label="Дом"
                                    className={classes.grid}
                                    value={house}
                                    onChange={(e) => setHouse(e.target.value)}
                                />
                                <TextField
                                    id="apartment"
                                    label="Сектор"
                                    className={classes.grid}
                                    value={apartment}
                                    onChange={(e) => setApartment(e.target.value)}
                                />
                            </Grid>
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
                        label="Логин получателя (необязательное поле)"
                        value={login}
                        onChange={handleSetRecipient}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary"> Отмена </Button>
                    <Button color="primary" onClick={createInvitation}> Создать </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}