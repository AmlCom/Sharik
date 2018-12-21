import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';


const Profile = () => {
    return (
        <div>
        <h1>This is the Profile page </h1>
        <Button bsStyle="success">Success</Button>




        </div>

    )
}

export default Profile;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles} from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing.unit * 2,
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// });

// function FullWidthGrid(props) {
//     const { classes } = props;

//     return (
//         <div className={classes.root}>
//             <Grid container spacing={24}>
//                 <Grid item xs={12}>
//                     <Paper className={classes.paper}>My Profile</Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                     <Paper className={classes.paper}>xs=12 sm=5</Paper>
//                     <h4>firstName & LastName</h4>
//                     <Grid item xs={8} sm={4}>
//                         <Paper className={classes.paper}></Paper>

//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12} sm={8}>
//                     <Paper className={classes.paper}>xs=12 sm=7</Paper>
//                 </Grid>

//                 <Grid item xs={6} sm={3}>
//                     <Paper className={classes.paper}>xs=6 sm=3</Paper>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                     <Paper className={classes.paper}>xs=6 sm=3</Paper>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                     <Paper className={classes.paper}>xs=6 sm=3</Paper>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }

// FullWidthGrid.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(FullWidthGrid);
