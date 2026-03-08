import { useMemo, useState } from "react";
import { FlatList, View, StyleSheet, Pressable, Platform } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  pickerWrapper: {
    backgroundColor: theme.colors.itemBackground,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d0d7de",
    overflow: "hidden",
  },
  picker: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.itemBackground,
    ...Platform.select({
      web: {
        padding: 12,
        outlineStyle: "none",
        borderWidth: 0,
      },
    }),
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder }) => (
  <View style={styles.headerContainer}>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(value) => setSelectedOrder(value)}
        style={styles.picker}
        dropdownIconColor={theme.colors.textPrimary}
        mode="dropdown"
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRated" />
        <Picker.Item label="Lowest rated repositories" value="lowestRated" />
      </Picker>
    </View>
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  onItemPress,
  selectedOrder,
  setSelectedOrder,
}) => {
  const repositoryNodes = useMemo(() => {
    const nodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    if (selectedOrder === "highestRated") {
      return [...nodes].sort((a, b) => b.ratingAverage - a.ratingAverage);
    }

    if (selectedOrder === "lowestRated") {
      return [...nodes].sort((a, b) => a.ratingAverage - b.ratingAverage);
    }

    return nodes;
  }, [repositories, selectedOrder]);

  return (
    <FlatList
      data={repositoryNodes}
      extraData={selectedOrder}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => onItemPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      }
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const { repositories } = useRepositories();

  const onItemPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onItemPress={onItemPress}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
