import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import Header from "../components/Header/Header";
import {
    Container, createStyles, Typography, Grid, Checkbox, TextField,
    Paper, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
    TableCell, TableBody, TableHead, TableContainer, TableRow, Table, Button
} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {UserContext} from "../context/UserProvider";
import {useHttp} from "../hooks/useHttp";
import {requests} from "../helpers/requests";
import {InvitationInterface} from "../interfaces/InvitationInterface";

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
        grid: {
            marginBottom: theme.spacing(2)
        },
        gridFilters: {
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(2)
        },
        emptyText: {
            textAlign: 'center',
            color: theme.palette.text.disabled
        },
        formControl: {
            paddingBottom: '24px',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            minWidth: 195,
            width: '10%'
        },
        valueField: {
            marginRight: theme.spacing(3),
        },
        submit: {

        }
    }),
);

export const HomePage = () => {
    const classes = useStyles();
    const {user} = useContext(UserContext)
    const {request} = useHttp()
    const [invitations, setInvitations] = useState<InvitationInterface[]>([])
    const [filterOn, setFilterOn] = useState<string>('country')
    const [filterValue, setFilterValue] = useState<string>('Россия')
    const [update, setUpdate] = useState<boolean>(true)
    const [isBySender, setIsBySender] = useState<boolean>(false)
    const [isByRecipient, setIsByRecipient] = useState<boolean>(false)

    useEffect(() => {
        if (!isByRecipient && !isBySender) {
            request(requests.getInvitationsByLocation.url(filterOn, filterValue),
                requests.getInvitationsByLocation.method, null)
                .then(data => {setInvitations(data as InvitationInterface[])})
        } else if (isBySender) {
            request(requests.getInvitationsMadeByPerson.url(1), requests.getPersonalInvitations.method, null)
                .then(data => {setInvitations(data as InvitationInterface[])})
        } else if (isByRecipient) {
            request(requests.getPersonalInvitations.url(1), requests.getPersonalInvitations.method, null)
                .then(data => {setInvitations(data as InvitationInterface[])})
        }

        setUpdate(false)
    }, [update])

    const handleFilterChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setFilterOn(event.target.value as string)
    }

    const handleFilterValueChange = (event : ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value as string)
    }

    return useObserver(() => (
        <>
            <Header/>
            <Container>
                <Paper className={classes.paper} elevation={5}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={2}
                        className={classes.grid}
                    >
                        <Grid item> <Typography variant={"h5"}> Список приглашений </Typography> </Grid>
                        <Grid item> </Grid>
                    </Grid>
                    <Typography variant={"h6"} className={classes.gridFilters}> Фильтры </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        className={classes.gridFilters}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={isBySender}
                                onChange={()=>{
                                    setIsBySender(!isBySender)
                                    setIsByRecipient(false)
                                }}
                                color={"primary"}
                            />}
                            label="Опубликованные мной"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={isByRecipient}
                                onChange={()=>{
                                    setIsByRecipient(!isByRecipient)
                                    setIsBySender(false)
                                }}
                                color={"primary"}
                            />}
                            label="Приглашения для меня"
                        />
                        <FormControl className={classes.formControl} disabled={isByRecipient || isBySender}>
                            <InputLabel id="demo-simple-select-label">Фильтровать по</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filterOn}
                                onChange={handleFilterChange}
                            >
                                <MenuItem key={1} value={'country'}>Страна</MenuItem>
                                <MenuItem key={2} value={'region'}>Область</MenuItem>
                                <MenuItem key={3} value={'town'}>Город</MenuItem>
                                <MenuItem key={4} value={'street'}>Улица</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Значение"
                            disabled={isByRecipient || isBySender}
                            className={classes.valueField}
                            onChange={handleFilterValueChange}
                        />
                        <Button
                            color={'primary'}
                            onClick={()=>setUpdate(true)}
                            className={classes.submit}
                        >
                            Обновить
                        </Button>
                    </Grid>
                    <TableContainer >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата</TableCell>
                                    <TableCell>Место</TableCell>
                                    <TableCell>Кто платит</TableCell>
                                    <TableCell>Сообщение</TableCell>
                                    <TableCell>Создатель</TableCell>
                                    <TableCell>Получатель</TableCell>
                                    <TableCell>Принято</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invitations.length > 0 ?
                                    (invitations.map((elem, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{elem.dateTime}</TableCell>
                                            <TableCell>{elem.place.name}</TableCell>
                                            <TableCell>{elem.whoWillPay === 1 ?'создатель':'получатель'}</TableCell>
                                            <TableCell>{elem.message}</TableCell>
                                            <TableCell>{elem.sender}</TableCell>
                                            <TableCell>{elem.recipient}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={elem.accepted}
                                                    //onChange={leftHandChange}
                                                    color={"primary"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )))
                                    :
                                    <Typography variant={"h6"} className={classes.gridFilters}>
                                        Упс! Ничего не найдено!
                                    </Typography>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    ))
}
