import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Checkbox, Collapse,
    createStyles, Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel, List, ListItem, ListItemText,
    MenuItem,
    Select, Typography
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {requests} from "../../helpers/requests";
import {useHttp} from "../../hooks/useHttp";
import {PlaceInterface} from "../../interfaces/PlaceInterface";
import {UserContext} from "../../context/UserProvider";
import {InvitationInterface} from "../../interfaces/InvitationInterface";
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from '@material-ui/icons/Place';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: theme.spacing(30),
            height: theme.spacing(30),
        }
    }),
);

export const AcceptInvitation = ({invitation, open, onClose } :
                                  {invitation: InvitationInterface|null, open: boolean, onClose: any}) => {

    const classes = useStyles();
    const {user} = useContext(UserContext)
    const {request} = useHttp()
    const [update, setUpdate] = useState<boolean>(true)
    const [selectFilterValue, setSelectFilterValue] = useState<string>('country')
    const [filterValue, setFilterValue] = useState<string>('Россия')
    const [imgSource, setImgSource] = useState('')
    const [openInfo, setOpenInfo] = useState<boolean>(false)
    const [visits, setVisits] = useState<number>(0)
    const [rating, setRating] = useState<number>(-1)


    useEffect(() => {
        if (invitation !== null) {
            fetch(`https://localhost:44399/api/files/${invitation.place.photo}`,{method: 'GET'})
                .then(response => response.blob())
                .then(img => {setImgSource(URL.createObjectURL(img))})

            request(requests.getVisitsCount.url(invitation.place.id), requests.getVisitsCount.method, null)
                .then(data => {setVisits(data)})
            request(requests.getRatingOfPlace.url(invitation.place.id), requests.getRatingOfPlace.method, null)
                .then(data => {setRating(data)})
        }
    }, [open])

    const handleAcceptInvitation = () => {
        if (invitation !== null)
            request(requests.acceptInvitation.url, requests.acceptInvitation.method, invitation.id)
                .catch(err => console.log(err))
        onClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Приглашение</DialogTitle>
                <DialogContent>
                    {invitation !== null ?
                        <>
                            <Avatar alt={'avatar'} variant="rounded" src={imgSource} className={classes.avatar}>
                                <PlaceIcon fontSize={"large"}/>
                            </Avatar>
                            <List>
                                <ListItem key={0} button onClick={()=>setOpenInfo(!openInfo)}>
                                    <ListItemText>
                                        <b>Место:</b> {invitation.place.name}
                                    </ListItemText>
                                    {openInfo ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openInfo} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem>
                                            <ListItemText>
                                                <b>Адрес:</b> {invitation.place.country}, {invitation.place.region},
                                                {invitation.place.town}, ул. {invitation.place.street}, д. {invitation.place.house},
                                                к. {invitation.place.apartment}, индекс - {invitation.place.mailIndex}
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText><b>Кухня:</b> {invitation.place.cuisineNationality}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText><b>Интерьер:</b> {invitation.place.interior}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText><b>Посещений:</b> {visits}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText><b>Рейтинг:</b> {rating === -1 ? 'нет оценок' : rating}</ListItemText>
                                        </ListItem>
                                    </List>
                                </Collapse>
                                <Divider />
                                <ListItem key={1}>
                                    <ListItemText><b>Дата и время встречи:</b> {invitation.dateTime}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem key={2}>
                                    <ListItemText><b>Оплата:</b> {invitation.whoWillPay === 1 ?'создатель':'раздельно'}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem key={3}>
                                    <ListItemText><b>Сообщение:</b> {invitation.message}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem key={4}>
                                    <ListItemText><b>Создатель:</b> {invitation.sender}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem key={5}>
                                    <ListItemText><b>Получатель:</b> {invitation.recipient}</ListItemText>
                                </ListItem>
                            </List>
                        </>
                        : ''}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary"> Отмена </Button>
                    <Button color="primary" onClick={handleAcceptInvitation}> Принять приглашение </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}