import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
    const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network',
      });

        const handleFetchMore = () => {
          const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
      
          if (!canFetchMore) {
            return;
          }
      
          fetchMore({
            query: GET_REPOSITORY,
            variables: {
              after: data.repository.reviews.pageInfo.endCursor,
              ...variables,
            },
          });
        };
       
        
        return { repository: data ? data.repository : undefined, loading, fetchMore: handleFetchMore, ...result,};
};

export default useRepository;
