import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  StatusBar as StatusB,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";

import SearchBar from "../components/home/SearchBar";
import TopBar from "../components/home/TopBar";
import ProductBoxContainer from "../components/home/ProductBoxContainer";
import AdsBoxScroller from "../components/home/AdsBoxScroller";
import { fetchProducts } from "../api/productAPI"; // Update this path
import { colors } from "../theme/colors";
import Filtre from "../components/home/Filtre";
import { Product } from "../@types/product";
import { productsStat } from "../@types/products";

export const HomeScreen: React.FC = () => {
  const [showSearch, toggleSearch] = React.useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("Best Match");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    // You can filter the products based on the search value here if needed
  };

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
    // You can filter the products based on the selected filter here if needed
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error as needed
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  const handleTextDebouce = useCallback(
    debounce((value: string) => handleSearch(value), 1200),
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 4,
          paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
        }}
      >
        {/* <TopBar /> */}
        <ScrollView
          style={styles.MainScreenContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <SearchBar
            showSearch={!showSearch}
            toggleSearch={toggleSearch}
            handleTextDebouce={handleTextDebouce}
          />
          <AdsBoxScroller products={products} />

          <Filtre
            onFilterPress={handleFilterPress}
            selectedFilter={selectedFilter}
          />
          <ProductBoxContainer products={products} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    flex: 1,
    width: "100%",
    backgroundColor: "Transparent",
    flexDirection: "column",
  },
  MainScreenContainer: {
    height: "auto",
    flex: 1,
    width: "100%",
    paddingHorizontal: "2%",
    backgroundColor: colors.maingray,
    flexDirection: "column",
  },
  ProductContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
