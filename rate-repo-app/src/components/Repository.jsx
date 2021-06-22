import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { useParams } from 'react-router-dom';
import Card from './Card';
import useRepository from '../hooks/useRepository';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    color: "white"
  }
});

const ReviewItem = ({ review }) => {
  return(
  <View style = {styles.container}>
    <Review props = {review} />
  </View>
  );
};

const Repository = () => {
    const id = useParams().id;
    const variables = {id, first:3};
    const { repository, fetchMore } = useRepository(variables);

    if (repository === undefined){return(<></>);}
    
    const reviews = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

    const onEndReach = () => {
      fetchMore();
      console.log('You have reached the end of the list');
    };
    return (
      <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <Card props = {repository} showUrl = {true} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
     />
        
    );
  };
  
export default Repository;