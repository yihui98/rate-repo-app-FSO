import React from 'react';
import { View, StyleSheet, Alert, Button} from 'react-native';
import { format } from 'date-fns';
import { useHistory } from "react-router-dom";

import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

const cardHeaderStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 1,
    },
    avatar: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center',
        color: theme.colors.primary
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderStyle: 'solid',
        justifyContent: 'center',
        marginRight: 5
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
          <View style={cardHeaderStyles.container}>
            <View style={cardHeaderStyles.avatarContainer}>
              <Text style={cardHeaderStyles.avatar}> {props.rating} </Text>
            </View>
            <View style={cardHeaderStyles.infoContainer}>
              <Text fontWeight="bold" fontSize="subheading">{props.user.username}</Text>
              <Text color="textSecondary" style={cardHeaderStyles.text}>{format(new Date(props.createdAt), 'dd/MM/yyyy')}</Text>
              <Text style = {cardHeaderStyles.text}> {props.text}</Text>
            </View>
          </View>
    );
  };



  const CardFooter = ({props}) => {
    let history = useHistory();
    const [ deleteReview ] = useDeleteReview();
  
      //if (deleteReview === undefined){return(<></>);}

    const deleteFunction = async () => {

      
      await deleteReview({id:props.id});
      history.push('/myReviews');
    };
  
    const confirmDeleteButton = () => {
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review",
        [
          {
            text: "CANCEL",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "DELETE", onPress: () => deleteFunction()}
        ]
      );
    };
    return (
          <View style={cardFooterStyles.container}>
            <Button onPress={() => history.push(`/repositories/${props.repository.id}`)} title = "View repository" />
            <Button onPress={() => confirmDeleteButton()} title = "Delete review" color = "red"/>
          </View>
    );
  };
  

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1

  },
});

const cardStyles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      padding: 10,
      backgroundColor: "white",
      borderBottomWidth: 15,
      borderColor: "lightgrey"
    },
  });


const Review = ({props, buttons}) => {
  if (buttons){
    return(
      <View style={cardStyles.container}>
      <CardHeader props = {props} />
      <CardFooter props = {props} />
      </View>
    );
  }
return (
    <View style={cardStyles.container}>
    <CardHeader props = {props} />
    </View>
);
};

export default Review;