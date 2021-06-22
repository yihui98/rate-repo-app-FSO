
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network', variables});
    if (loading) return 'Loading...';
    
    if (error) return `Error! ${error.message}`;

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repositories.pageInfo.endCursor,
            ...variables,
          },
        });
      };
    return { repositories: data ? data.repositories : undefined, loading, fetchMore: handleFetchMore, ...result,};
  
};

export default useRepositories;