import { View } from "react-native";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading || !repository) {
    return null;
  }

  return (
    <View>
      <RepositoryItem item={repository} showGitHubButton />
    </View>
  );
};

export default SingleRepository;
