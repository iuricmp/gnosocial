import SearchResults from "@gno/components/list/search/search-result-list";
import { useSearch } from "@gno/hooks/use-search";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Search() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();
  const search = useSearch();
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (params.q) {
      search.searchUser(params.q).then((result) => {
        console.log("result", result);
        setData(result);
      });
    }
  }, [params.q]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Search",
          headerSearchBarOptions: {
            autoCapitalize: "none",
            inputType: "text",
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        }}
      />
      <SearchResults data={data} />
    </View>
  );
}
