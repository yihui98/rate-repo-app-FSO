import React from 'react';
import { View, Image, StyleSheet, Pressable, Alert, Button } from 'react-native';
import { Link } from "react-router-native";
import * as WebBrowser from 'expo-web-browser';
import Text from './Text';
import theme from '../theme';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink:1
  },
  descriptionContainer: {
      flexGrow:0,
      flexShrink:1,
      borderWidth: 0,
      borderColor: theme.colors.primary,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
  },
  inner : {
      borderWidth: 4
  },
  text: {
    flexShrink: 1
  }

});

const CardHeader = ({props}) => {
  return (
    <Pressable onPress = {() => Alert.alert("You pressed the text!")}>
      <Link to = {`/repositories/${props.id}`}>
        <View style={cardHeaderStyles.container}>
          <View style={cardHeaderStyles.avatarContainer}>
            <Image style={cardHeaderStyles.avatar} source={{uri : props.ownerAvatarUrl }} />
          </View>
          <View style={cardHeaderStyles.infoContainer}>
            <Text fontWeight="bold" fontSize="subheading" testID = 'fullName'>{props.fullName}</Text>
            <Text color="textSecondary" style={cardHeaderStyles.text} testID = 'description'>{props.description}</Text>
            <View style = {cardHeaderStyles.container}>
              <Text color = "white" style = {cardHeaderStyles.descriptionContainer} testID = 'language'> {props.language} </Text>
            </View>
          </View>
        </View>
      </Link>
    </Pressable>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  actionTouchable: {
    flexGrow: 0,
  },
  typeCount: {
    justifyContent: "center",
    alignItems: "center",
  }
});

const TypeCount = ({ name, number }) =>{
  const newNumber = number > 1000 ? (number/1000).toFixed(1) + "k" : number;
  return(
    <View style = {cardFooterStyles.typeCount} >
      <Text testID = {name}> {newNumber} </Text>
      <Text> {name}</Text>
    </View>
  );
};


const CardFooter = ({props}) => {
  return (
    <View style={cardFooterStyles.container}>
      <TypeCount name = "Stars" number = {props.stargazersCount} />
      <TypeCount name = "Forks" number = {props.forksCount} />
      <TypeCount name = "Reviews" number = {props.reviewCount} />
      <TypeCount name = "Rating" number = {props.ratingAverage} />
    </View>
  );
};


const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: "white"
  },
});

const SubmitButton = ({props}) =>{
  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(props.url);
  };
  return(
    <Button title = "Open in GitHub" onPress = {handleOpenWithWebBrowser}/>
  );
  };

const Card = ({props, showUrl}) => {
  if (showUrl){
    return(
      <View style={cardStyles.container}>
      <CardHeader props = {props} />
      <CardFooter props = {props}/>
      <SubmitButton props = {props} />
    </View>
    );
  }
  return (
    <View style={cardStyles.container}>
      <CardHeader props = {props} />
      <CardFooter props = {props}/>
    </View>
  );
};

export default Card;