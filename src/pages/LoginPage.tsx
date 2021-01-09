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
import {FormControl, InputLabel, Link, MenuItem, Select} from "@material-ui/core";


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
    text: {
        cursor: 'pointer'
    },
    select: {
        margin: theme.spacing(2, 0, 1)
    }
}));

export default function LoginPage() {
    const classes = useStyles();
    const history = useHistory()
    const {clearError, request, loading, error} = useHttp()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {setIsAuth, setUser} = useContext(UserContext)
    const [isRegistration, setIsRegistration] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<number>(2)
    const [age, setAge] = useState<number>(0)

    const logIn = () => {
        request(requests.login.url(login, password), requests.login.method, null)
            .then(data => {
                setUser(data)
                setIsAuth(true)
                localStorage.setItem('login', login)
                localStorage.setItem('password', password)
                history.push(routes.toHome)
            })
    }

    const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        try {await logIn()}
        catch (e) {}
    }

    const handleSubmitRegister = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        try {
            request(requests.createUser.url, requests.createUser.method, {
                "Name": name,
                "Age": age,
                "Gender": gender,
                "Login": login,
                "Password": password
            }).then(() => {logIn()})
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
                <Avatar className={classes.avatar}><EmojiFoodBeverageIcon fontSize="large"/></Avatar>
                <Typography component="h1" variant="h5">
                    Go Eat App!
                </Typography>
                {!isRegistration ?
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
                    :
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmitRegister}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Имя"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value as number)}
                            >
                                <MenuItem key={1} value={0}>Мужской</MenuItem>
                                <MenuItem key={2} value={1}>Женский</MenuItem>
                                <MenuItem key={3} value={2}>Не указан</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Возраст"
                            type={'number'}
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="loginReg"
                            label="Логин"
                            name="login"
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
                            id="passwordReg"
                            onChange={handleChangePassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                }
                <Link
                    className={classes.text}
                    onClick={(e: { preventDefault: () => void; }) => {
                        e.preventDefault()
                        setIsRegistration(!isRegistration)
                    }}>
                    {isRegistration ? 'Вход' : 'Регистрация'}
                </Link>
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