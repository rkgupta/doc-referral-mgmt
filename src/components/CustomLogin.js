import React from 'react';
import { Login, LoginForm } from 'ra-ui-materialui';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  login: {
    main: {
      backgroundImage: 'url(https://source.unsplash.com/1600x900/?tajmahal) !important'
    },
    card: {
      padding: '5px 0 15px 0'
    }
  },
  form: {
    button: {
      height: '3em'
    }
  }
};

const MyLoginForm = withStyles(styles.form)(LoginForm);

const MyLogin = props => <Login loginForm={<MyLoginForm />} {...props} />;

export default withStyles(styles.login)(MyLogin);
