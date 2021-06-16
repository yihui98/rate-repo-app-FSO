import React from 'react';
import { Pressable, View, StyleSheet  } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      alignItems: 'stretch',
      padding: 10,
    },
    loginBox: {
        borderWidth: 1,
        flex: 0,
        borderColor: theme.colors.textSecondary,
        backgroundColor: theme.colors.white,
        height: 50,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    signInContainer: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        textAlign: "center",
        height: 50,
        padding: 15,
    },
    // ...
  });

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must have min of 5 letters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be more than or equal to 8 letters')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
    return (
      <View style = {styles.container}>
        <FormikTextInput style = {styles.loginBox} name="username" placeholder="Username" />
        <FormikTextInput style = {styles.loginBox} secureTextEntry name="password" placeholder="Password" />
        <Pressable onPress={onSubmit}>
          <Text style = {styles.signInContainer}>Sign in</Text>
        </Pressable>
      </View>
    );
  };

  const SignIn = () => {
    const onSubmit = values => {
      const username = values.username;
      const password = values.password;
  
      console.log("Login successful");
    };
  
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

export default SignIn;