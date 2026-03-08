import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "no-cache",
    variables,
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, error };
};

export default useRepositories;
