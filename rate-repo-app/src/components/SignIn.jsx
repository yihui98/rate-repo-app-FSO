import React from 'react';
import { Pressable, View, StyleSheet  } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import  useSignIn from '../hooks/useSignIn';

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

export const initialValues = {
    username: '',
    password: '',
};

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must have min of 5 letters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be more than or equal to 8 letters')
    .required('Password is required'),
});

export const SignInForm = ({ onSubmit }) => {
    return (
      <View style = {styles.container}>
        <FormikTextInput style = {styles.loginBox} name="username" placeholder="Username" testID = 'usernameField' />
        <FormikTextInput style = {styles.loginBox} secureTextEntry name="password" placeholder="Password" testID = 'passwordField' />
        <Pressable onPress={onSubmit}>
          <Text style = {styles.signInContainer} testID = 'submitButton'>Sign in</Text>
        </Pressable>
      </View>
    );
  };

  const SignIn = () => {
    const [ signIn ] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {
      const { username, password } = values;
      
      try{
        const data  = await signIn({ username, password});
        console.log(data);
        console.log("Login successful");
        history.push("/");
      } catch(e){
        console.log(e);
      }
    };
  
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

export default SignIn;