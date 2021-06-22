import React from 'react';
import {  View, StyleSheet, Button  } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";

import useCreateReview from '../hooks/useCreateReview';
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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

export const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, "Rating must be more than 0")
    .max(100, "Rating must be less than 100")
    .required('Rating is required'),
  text: yup
    .string()
});

export const CreateReviewForm = ({ onSubmit }) => {
    return (
      <View style = {styles.container}>
        <FormikTextInput style = {styles.loginBox} name="ownerName" placeholder="Repository owner name" />
        <FormikTextInput style = {styles.loginBox} name="repositoryName" placeholder="Repository name" />
        <FormikTextInput style = {styles.loginBox} name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput style = {styles.loginBox} multiline = {true} name="text" placeholder="Review" />
        <Button onPress = {onSubmit} title = 'Create a review' />
      </View>
    );
  };

  const CreateReview = () => {
    const [ createReview ] = useCreateReview();
    let history = useHistory();

    const onSubmit = async (values) => {
      console.log("values", values);
      const { repositoryName, ownerName, rating, text } = values;
      
      try{
        const data  = await createReview({ repositoryName, ownerName, rating, text });
        console.log("Data for create review", data);
        history.push(`/repositories/${data.createReview.repositoryId}`);
      } catch(e){
        console.log(e);
      }
    };
  
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

export default CreateReview;