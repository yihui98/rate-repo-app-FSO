import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Review from './Review';
import useUser from '../hooks/useUser';


const styles = StyleSheet.create({
  container: {
    color: "white"
  }
});

const ReviewItem = ({ review }) => {
    
    return(
    <View style = {styles.container}>
      <Review props = {review} buttons = {true}/>
    </View>
    );
  };

const MyReviews = () => {
    const {user} = useUser({includeReviews: true});

    if (user === undefined){return(<></>);}

    const reviews = user.reviews
    ? user.reviews.edges.map(edge => edge.node)
    : [];

    

    return (
      <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
     />
        
    );
  };
  
export default MyReviews;