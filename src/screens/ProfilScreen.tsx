import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar as StatusB,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { users } from "../@types/users";
import UserInfos from "../components/profil/UserInfo";
import Commands from "../components/profil/Commands";
import Panel from "../components/profil/Panel";
import { fetchUserById } from "../api/productAPI";
import { User } from "../@types/product";
import { users } from "../@types/users";

export const ProfilScreen: React.FC = () => {
  // const user = users[0];

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(1); // Assuming user ID is 1 for demonstration
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 4,
          paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
        }}
      >
        <UserInfos user={user} />
        <Commands userId={1} />
        <Panel userId={1} />
      </SafeAreaView>
      {/* <Text style={styles.text}>Profil</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
});
