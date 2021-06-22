import React from 'react';
import { Text, View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import useUser from '../hooks/useUser';

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black",
    flexGrow: 0,
    flexShrink:1,
    flexDirection: "row",
    
  },
  text: {
      color: "white",
      textAlign: "left",
      textAlignVertical: "bottom",
      fontSize: 18,
      fontWeight: 'bold',
      paddingRight: 5,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingTop: 10
  }
  // ...
});




const AppBar = () => {
  const {user} = useUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore(); //clear Apollo client cache and re-execute all active queries
  };

  if (user){
    return <View style={styles.container}>
    <ScrollView horizontal>
      <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
        <Link to = "/">
            <Text style = {styles.text}> Repositories</Text>
          </Link>
      </Pressable>
      <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
        <Link to = "/createReview">
            <Text style = {styles.text}> Create a review</Text>
          </Link>
      </Pressable>
      <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
        <Link to = "/myReviews">
            <Text style = {styles.text}> My reviews</Text>
          </Link>
      </Pressable>
      <Pressable onPress = {signOut}>
          <Text style = {styles.text}> Sign Out</Text>
      </Pressable>
    </ScrollView>
      </View>;
  }
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
      <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
        <Link to = "/signup">
            <Text style = {styles.text}> Sign up</Text>
          </Link>
      </Pressable>
    </ScrollView>
      </View>;
};

export default AppBar;