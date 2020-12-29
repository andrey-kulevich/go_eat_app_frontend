import Container from "@material-ui/core/Container";
import React from "react";
import {CircularProgress, Typography, Grid} from "@material-ui/core";


export const WaitingPage = () =>(
    <Container component="main" maxWidth="xs">
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              style={{marginTop: '2rem'}}
              spacing={2}
        >
            <Grid item>
                <CircularProgress />
            </Grid>
            <Grid item>
                <Typography variant="body1" component="p" color={'textSecondary'}>
                    Определяем где вы были в последний раз...
                </Typography>
            </Grid>
        </Grid>
    </Container>
)
