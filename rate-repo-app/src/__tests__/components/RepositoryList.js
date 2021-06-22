import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from '../../components/RepositoryItem';
import { render } from '@testing-library/react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});
const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) =>(
    <RepositoryItem props = { item } />
);

const RepositoryListContainer = ({repositories}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem = {renderItem}
        key = {repositoryNodes.id}
      />
    );
  };


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const { getAllByTestId } = render(<RepositoryListContainer repositories = {repositories} />);

      expect(getAllByTestId('fullName')[0]).toHaveTextContent('jaredpalmer/formik');
      expect(getAllByTestId('fullName')[1]).toHaveTextContent('async-library/react-async');

      expect(getAllByTestId('description')[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(getAllByTestId('language')[0]).toHaveTextContent('TypeScript');
      expect(getAllByTestId('Forks')[0]).toHaveTextContent('1.6k');
      expect(getAllByTestId('Stars')[0]).toHaveTextContent('21.9k');
      expect(getAllByTestId('Rating')[0]).toHaveTextContent(88);
      expect(getAllByTestId('Reviews')[0]).toHaveTextContent(3);
    });
  });
});