import React from 'react';
import { Text, View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black",
    flexGrow: 0,
    flexShrink:1,
    flexDirection: "row"
  },
  text: {
      color: "white",
      textAlign: "left",
      textAlignVertical: "bottom",
      fontSize: 20
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
        <Link to = "/">
            <Text style = {styles.text}> Repositories</Text>
          </Link>
      </Pressable>
      <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
        <Link to = "/signin">
          <Text style = {styles.text}> Sign In</Text>
        </Link>
      </Pressable>
    </ScrollView>
      </View>;
};

export default AppBar;