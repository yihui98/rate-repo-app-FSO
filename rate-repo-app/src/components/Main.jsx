import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import Repository from './Repository';
import CreateReview from './CreateReview';
import CreateUser from './CreateUser';
import MyReviews from './MyReviews';
//import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
      <Switch>
        <Route path = "/signin" exact>
          <SignIn/>
        </Route>
        <Route path = "/repositories/:id" exact>
          <Repository/>
        </Route>
        <Route path = "/createReview" exact>
          <CreateReview/>
        </Route>
        <Route path = "/signup" exact>
          <CreateUser/>
        </Route>
        <Route path = "/myReviews" exact>
          <MyReviews/>
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;