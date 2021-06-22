import React from 'react';
import {  View, StyleSheet, Button  } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";

import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
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

export const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
};

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be more than 5 characters")
    .max(30, "Username must be less than 30 characters")
    .required('Repository owner name is required'),
    password: yup
    .string()
    .min(5, "Password must be more than 5 characters")
    .max(50, "Password must be less than 50 characters")
    .required('Password is required'),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation must match the password')
  });

export const CreateUserForm = ({ onSubmit }) => {
    return (
      <View style = {styles.container}>
        <FormikTextInput style = {styles.loginBox} name="username" placeholder="Username" />
        <FormikTextInput style = {styles.loginBox} secureTextEntry name="password" placeholder="Password" />
        <FormikTextInput style = {styles.loginBox} secureTextEntry name="passwordConfirm" placeholder="Confirm Password" />
        <Button onPress = {onSubmit} title = 'Create a user' />
      </View>
    );
  };

  const CreateUser = () => {
    const [ createUser ] = useCreateUser();
    const [ signIn ] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
      console.log("values", values);
      const { username, password } = values;
      
      try{
        const data  = await createUser({ username, password });
        await signIn({ username, password});
        history.push('/');
        console.log("Data for create user", data);
      } catch(e){
        console.log(e);
      }
    };
  
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
        {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

export default CreateUser;