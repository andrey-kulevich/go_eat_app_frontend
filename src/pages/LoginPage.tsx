import React, {ChangeEvent, useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import {routes} from "../helpers/paths";
import {useHttp} from "../hooks/useHttp";
import {requests} from "../helpers/requests";
import CustomSnackbar from "../components/CustomSnackbar";
import {UserContext} from "../context/UserProvider";
import {UserInterface} from "../interfaces/UserInterface";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color:'#fff'
    },
}));

export default function LoginPage() {
    const classes = useStyles();
    const {clearError, request, loading, error} = useHttp()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {setIsAuth, setUser} = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        try {
            await request(requests.login.url(login, password), requests.login.method, null)
                .then(data => {
                    setUser(data)
                    setIsAuth(true)
                    localStorage.setItem('login', login)
                    localStorage.setItem('password', password)
                })
            history.push(routes.toHome)
        } catch (e) {}
    }

    const handleChangeLogin = (event : ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handleChangePassword = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EmojiFoodBeverageIcon fontSize="large"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Go Eat App!
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Логин"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        onChange={handleChangeLogin}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        onChange={handleChangePassword}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                </form>
            </div>
            <CustomSnackbar
                open={Boolean(error)}
                handleClose={clearError}
                message={"Неверный логин или пароль!"}
                kind={"error"}
            />
        </Container>
    );
}