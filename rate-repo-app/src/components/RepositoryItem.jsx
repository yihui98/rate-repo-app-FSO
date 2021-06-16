import React from 'react';
import { View, StyleSheet } from 'react-native';
//import Text from './Text';
import Card from './Card';

const styles = StyleSheet.create({
  container: {
    color: "white"
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const RepositoryItem = ({ props }) => (
        <View style = {styles.container}>
          <Card props = {props} />
        </View>
);
  
  export default RepositoryItem;