import React from "react";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(2)
        },
    }),
);

export const ContentLoader = ({message}:{message:string}) => (
    <div className={useStyles().paper}>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <CircularProgress />
            </Grid>
            <Grid item>
                <Typography >
                    {message}
                </Typography>
            </Grid>
        </Grid>
    </div>
)
