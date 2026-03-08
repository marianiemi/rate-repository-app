import React, { useMemo, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
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
  searchInput: {
    backgroundColor: theme.colors.itemBackground,
    borderWidth: 1,
    borderColor: "#d0d7de",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
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

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => (
  <View style={styles.headerContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } =
      this.props;

    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, onItemPress } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const variables = useMemo(() => {
    switch (selectedOrder) {
      case "highestRated":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
          searchKeyword: debouncedSearchKeyword,
        };
      case "lowestRated":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
          searchKeyword: debouncedSearchKeyword,
        };
      default:
        return {
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
          searchKeyword: debouncedSearchKeyword,
        };
    }
  }, [selectedOrder, debouncedSearchKeyword]);

  const { repositories } = useRepositories(variables);

  const onItemPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onItemPress={onItemPress}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
