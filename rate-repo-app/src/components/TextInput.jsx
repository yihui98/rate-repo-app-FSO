import React from 'react';
import theme from '../theme';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
errorBox: {
  borderWidth: 1,
  flex: 0,
  borderColor: theme.colors.textError,
  backgroundColor: theme.colors.white,
  height: 50,
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  }
});

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style];
  if (error){
    textInputStyle = styles.errorBox;
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;