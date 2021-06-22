import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useLazyQuery } from '@apollo/client';
import { GET_SELECTED_REPOSITORIES, GET_SEARCH_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) =>(
    <RepositoryItem props = { item } showUrl = {false} />
);

export class RepositoryListContainer extends React.Component {
  

  renderHeader = () =>{
    const [getPart, result ] = useLazyQuery(GET_SELECTED_REPOSITORIES);
    const [getQuery, results ] = useLazyQuery(GET_SEARCH_REPOSITORIES);
    const [selectedPart, setSelectedPart] = useState();
    const props = this.props;

    const showPart = (value) =>{
      setSelectedPart(value);
      if(value === "latest"){
        getPart({variables:{orderBy: "CREATED_AT", orderDirection: "ASC", searchKeyword: `${props.value.toLowerCase()}`}});
      } else if (value === 'highest'){
        console.log(props.value);
        getPart({variables:{orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword: `${props.value.toLowerCase()}`}});
      }else if (value === 'lowest'){
        getPart({variables:{orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword: `${props.value.toLowerCase()}`}});
      }
    };
    useEffect(() =>{
      if (result.data){
        const test =  result.data.repositories
      ? result.data.repositories.edges.map(edge => edge.node)
      : [];
        props.setPart(test);
      }
      else if  (results.data){
        const test =  results.data.repositories
      ? results.data.repositories.edges.map(edge => edge.node)
      : [];
        props.setPart(test);
      }
    }, [result, results]); 

    const showQuery = (value) =>{
      props.setQuery(value);
      getQuery({variables: {searchKeyword : `${value.toLowerCase()}`}});
    };

    const HeaderStyles = StyleSheet.create({
      container: {
        flexGrow: 0.5,
        backgroundColor: "lightgrey",
      },
      compartment: {
        padding:10,
        paddingTop: 10,
        justifyContent: 'center',
        height: 58,
        flex: 1   
      }
    
    });


    return(
      <View style = {HeaderStyles.container}>
      <Searchbar style = {HeaderStyles.compartment} placeholder = "Search" onChangeText = {(itemValue) => showQuery(itemValue)} value = {props.query}/>
      <Picker style = {HeaderStyles.compartment} selectedValue = {selectedPart}
      onValueChange = {(itemValue) => showPart(itemValue)}>
        <Picker.Item label = "Latest repositories" value = 'latest'/>
        <Picker.Item label = "Highest rated repositories" value = 'highest'/>
        <Picker.Item label = "Lowest rated repositories" value = 'lowest'/>
      </Picker>
      </View>

    );};

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];

    if (props.part){
      return (
        <FlatList
          data={props.part}
          ItemSeparatorComponent={ItemSeparator}
          renderItem = {renderItem}
          key = {props.part.id}
          ListHeaderComponent = {this.renderHeader}
          onEndReached={props.onEndReach}
          onEndReachedThreshold={0.5}
        />
      );
    }
    
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem = {renderItem}
        key = {repositoryNodes.id}
        ListHeaderComponent = {this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
const RepositoryList = () => {
  const [part, setPart] = useState(null);
  const { repositories, fetchMore } = useRepositories({first: 8});
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, 500);

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };
  // Get the nodes from the edges array
  return(
    <RepositoryListContainer part= {part} setPart = {setPart} repositories = {repositories}
       value = {value} setQuery = {setQuery} query = {query} onEndReach={onEndReach}/>
  );

};

export default RepositoryList;