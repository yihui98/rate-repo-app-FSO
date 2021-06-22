import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInForm, initialValues, validationSchema } from '../../components/SignIn';
import { Formik } from 'formik';

const SignInContainer = ({onSubmit}) => {
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
    const onSubmit = jest.fn();
    jest.setTimeout(10000);
    const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

    await act(async () => {
        fireEvent.changeText(getByTestId('usernameField'), 'kalle');
        fireEvent.changeText(getByTestId('passwordField'), 'password');
        fireEvent.press(getByTestId('submitButton'));
    
      });
      
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });
});