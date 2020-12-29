import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import {routes} from "../../helpers/paths";
import {ExitBtn} from "./ExitBtn";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            cursor: 'pointer'
        },
        flexGrow: {
            flexGrow: 1,
            cursor: 'pointer'
        },
    }),
);

export default function Header() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.menuButton}
                        onClick={() => history.push(routes.toHome)}
                    >
                        GoEatApp
                    </Typography>
                    <Typography
                        variant="button"
                        className={classes.menuButton}
                        onClick={() => history.push(routes.toHome)}
                    >
                        настройки
                    </Typography>
                    <Typography
                        variant="button"
                        className={classes.flexGrow}
                        onClick={() => history.push(routes.toHome)}
                    >
                        сообщения
                    </Typography>
                    <ExitBtn/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
