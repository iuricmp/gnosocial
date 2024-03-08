import { FlatList, StyleSheet } from "react-native";
import PersonItem from "./search-item";

function SearchResults({ data }: { data: string[] }) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => <PersonItem userName={item} />}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: 16,
    width: "100%",
  },
});

export default SearchResults;
