import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Divider, List, useTheme } from "react-native-paper";
import { router } from "expo-router";
const User = () => {
  const { slug } = useLocalSearchParams();
  const [user, setUser] = useState();

  const theme = useTheme();

  return (
    <View className="min-h-screen">
      <View className="w-full h-1/2" style={styles.userContainer}>
        <View className="items-center space-y-3 justify-center mt-36">
          <Avatar.Image
            source={require("@/assets/images/avatar_default.png")}
            size={100}
          />
          <Text className="font-bold text-lg text-white">Felix Kjelberg</Text>
        </View>
      </View>
      <View className="bg-white w-full" style={styles.menuContainer}>
        <List.Item
          title="Edit Profile"
          left={(props) => <List.Icon {...props} icon="account-outline" />}
          right={(props) => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.colors.secondary}
            />
          )}
          onPress={() => router.push("/user/edit")}
        />
        <Divider />
        <List.Item
          title="My Recipe"
          left={(props) => <List.Icon {...props} icon="book-outline" />}
          right={(props) => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.colors.secondary}
            />
          )}
          onPress={() => router.push("/user/myrecipe")}
        />
        <Divider />
        <List.Item
          title="Saved Recipe"
          left={(props) => <List.Icon {...props} icon="bookmark-outline" />}
          right={(props) => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.colors.secondary}
            />
          )}
          onPress={() => router.push("/user/saved")}
        />
        <Divider />
        <List.Item
          title="Liked Recipe"
          left={(props) => <List.Icon {...props} icon="thumb-up-outline" />}
          right={(props) => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.colors.secondary}
            />
          )}
          onPress={() => router.push("/user/liked")}
        />
        <Divider />
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "#EEC302",
  },
  menuContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 1000,
    marginTop: -250,
    padding: 10,
  },
});
