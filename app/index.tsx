import { useAuth } from "@/components/context/AuthContext";
import { Pressable, Text, View } from "react-native";

export default function SignIn() {
  const { signOut, user } = useAuth();
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={handleSignOut}>
        <Text>Logout</Text>
      </Pressable>

      {/* <Text>{JSON.stringify(user)}</Text> */}
    </View>
  );
}
