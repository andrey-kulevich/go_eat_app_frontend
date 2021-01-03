import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import Header from "../components/Header/Header";
import {
    Container, createStyles, Typography, Paper, List, ListItem, Divider, ListItemText, Collapse
} from "@material-ui/core";
import {observer, useObserver} from "mobx-react-lite";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {UserContext} from "../context/UserProvider";
import {useHttp} from "../hooks/useHttp";
import {requests} from "../helpers/requests";
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import {DishInterface} from "../interfaces/DishInterface";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxHeight: 500,
            minHeight: 300,
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
        },
        paper: {
            margin: theme.spacing(5, 0),
            minHeight: 300,
            padding: theme.spacing(2)
        },
        nested: {
            paddingLeft: theme.spacing(5),
        },
        nested2: {
            paddingLeft: theme.spacing(10),
        },
    }),
);

export const UserPage = () => { //user: {user:UserInterface}
    const classes = useStyles();
    const {request} = useHttp()
    const {user} = useContext(UserContext)
    const [openPreferences, setOpenPreferences] = useState<boolean>(false);
    const [open1, setOpen1] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);
    const [open3, setOpen3] = useState<boolean>(false);
    const [open4, setOpen4] = useState<boolean>(false);

    useEffect(() => {
        // request(requests.getInvitationsByLocation.url(filterOn, filterValue),
        //     requests.getInvitationsByLocation.method, null)
        //     .then(data => {setInvitations(data as InvitationInterface[])})
    }, [])

    const handleFilterChange = (event : ChangeEvent<HTMLInputElement>) => {

    }

    const getListItemDish = (dish: DishInterface, text: string, open: boolean, setOpen: any) => {
        return (
            <>
                <ListItem button onClick={()=>setOpen(!open)} className={classes.nested}>
                    <ListItemText><b>{text}</b></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {dish !== null ?
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nested2}>
                            <ListItemText><b>Название:</b> {dish.name}</ListItemText>
                        </ListItem>
                        <ListItem className={classes.nested2}>
                            <ListItemText><b>Тип блюда:</b> {dish.dishType}</ListItemText>
                        </ListItem>
                        <ListItem className={classes.nested2}>
                            <ListItemText><b>Кухня:</b> {dish.cuisineNationality}</ListItemText>
                        </ListItem>
                        <ListItem className={classes.nested2}>
                            <ListItemText><b>Рецепт:</b> {dish.recipe}</ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
                : ''}
            </>
        )
    }

    return useObserver(() => (
        <>
            <Header/>
            <Container>
                <Paper className={classes.paper} elevation={5}>
                    <Typography variant={"h4"}>{user.name}</Typography>
                    <List>
                        <ListItem key={0}><ListItemText><b>Возраст:</b> {user.age}</ListItemText></ListItem>
                        <Divider />
                        <ListItem key={1}><ListItemText><b>Пол:</b> {user.gender}</ListItemText></ListItem>
                        <Divider />
                        <ListItem key={2}><ListItemText><b>Статус:</b> {user.status}</ListItemText></ListItem>
                        <Divider />
                        <ListItem key={3} button onClick={()=>setOpenPreferences(!openPreferences)}>
                            <ListItemText><b>Предпочтения</b></ListItemText>
                            {openPreferences ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openPreferences} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem className={classes.nested}>
                                    <ListItemText><b>Кухня:</b> {user.preferences.cuisineNationality}</ListItemText>
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <ListItemText><b>Интерьер:</b> {user.preferences.interior}</ListItemText>
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <ListItemText><b>Процент чаевых:</b> {user.preferences.tipsPercentage}%</ListItemText>
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <ListItemText><b>Вегетарианец:</b> {user.preferences.isVegan ? 'да':'нет'}</ListItemText>
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <ListItemText><b>Сыроед:</b> {user.preferences.isRawFood ? 'да':'нет'}</ListItemText>
                                </ListItem>
                                {getListItemDish(user.preferences.bestDrink, "Любимый напиток", open1, setOpen1)}
                                {getListItemDish(user.preferences.bestFirstMeal, "Любимое первое блюдо", open2, setOpen2)}
                                {getListItemDish(user.preferences.bestSecondMeal, "Любимое второе блюдо", open3, setOpen3)}
                                {getListItemDish(user.preferences.bestDessert, "Любимый десерт", open4, setOpen4)}
                            </List>
                        </Collapse>
                    </List>
                </Paper>
            </Container>
        </>
    ))
}
