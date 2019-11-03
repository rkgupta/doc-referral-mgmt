import React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LocalHospitalTwoToneIcon from '@material-ui/icons/LocalHospitalTwoTone';

const styles = {
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  spacer: {
    flex: 1
  }
};

const CustomAppBar = withStyles(styles)(({ classes, ...props }) => (
  <AppBar {...props}>
    <Typography variant="title" color="inherit" className={classes.title} id="react-admin-title" />
    <h4>Pooja Medical Store</h4>
    <LocalHospitalTwoToneIcon />
    <span className={classes.spacer} />
  </AppBar>
));

export default CustomAppBar;
