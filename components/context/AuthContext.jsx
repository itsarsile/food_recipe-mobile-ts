import {
  router,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import axios from "axios";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function usePortectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments, navigationState]);
}

export function AuthProvider(props) {
  const [user, setAuth] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await SecureStorage.getItemAsync("token");
        console.info("stored token:", token);
        if (token) {
          setAuth({ token });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  usePortectedRoute(user);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        "https://6j2m3t-6000.csb.app/api/auth/login",
        { email, password }
      );
      const { accessToken } = response.data;
      console.log(accessToken);
      setAuth({ token: accessToken });

      await SecureStorage.setItemAsync("token", accessToken);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      // Remove the token from AsyncStorage
      await SecureStorage.deleteItemAsync("token");

      // Clear the user's authentication status
      setAuth(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
