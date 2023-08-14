import {
  router,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import axios from "axios";

interface UserTypes {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  phone: string;
}

interface User {
  token: string;
  refreshToken: string;
  user: UserTypes;
}

interface AuthContextType {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  refreshAccessToken: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

function usePortectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/home");
    }
  }, [user, segments, navigationState]);
}

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setAuth] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await SecureStorage.getItemAsync("userData");
        if (userData) {
          const { token, refreshToken, user } = JSON.parse(userData);
          setAuth({ token, user, refreshToken });

          if (await verifySession(token)) {
            router.replace("/home");
          } else {
            refreshAccessToken();
            signOut();
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  usePortectedRoute(user);

  const refreshAccessToken = async () => {
    try {
      const storedUserData = await SecureStorage.getItemAsync("userData");
      if (storedUserData) {
        const { refreshToken } = JSON.parse(storedUserData);
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const newAccessToken = response.data.accessToken;
        console.info("New Acces Token", newAccessToken);

        setAuth((prevState) => ({
          ...prevState!,
          token: newAccessToken,
        }));
        const updatedUserData = JSON.stringify({
          ...JSON.parse(storedUserData),
          token: newAccessToken,
        });
        await SecureStorage.setItemAsync("userData", updatedUserData);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}auth/login`,
        { email, password }
      );
      console.log(process.env.EXPO_PUBLIC_API_URL);
      console.log(response.data);
      const { accessToken, refreshToken, user } = response.data;
      console.log(accessToken);
      setAuth((prevState) => ({
        ...prevState,
        token: accessToken,
        refreshToken: refreshToken,
        user,
      }));

      const userData = JSON.stringify({ token: accessToken, user });
      await SecureStorage.setItemAsync("userData", userData);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      // Remove the token from AsyncStorage
      await SecureStorage.deleteItemAsync("userData");

      // Clear the user's authentication status
      setAuth(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const verifySession = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 500) {
        return false;
      }
      return true;
    } catch (error) {
      await refreshAccessToken();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        refreshAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
