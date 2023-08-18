import { useLoginMutation } from "@/src/features/auth/authApiSlice";
import { logOut, setCredentials } from "@/src/features/auth/authSlice";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface UserTypes {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  phone: string;
}

interface User {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserTypes | null;
}

interface AuthContextType {
  signIn?: (email: string, password: string) => void;
  signOut?: () => Promise<any>;
  user?: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      router.push("/(auth)/");
    } else if (user && inAuthGroup) {
      router.replace("/home");
    }
  }, [user, segments, navigationState]);
}

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const [user, setAuth] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await SecureStorage.getItemAsync("userData");
        console.log(
          "🚀 ~ file: AuthContext.tsx:70 ~ checkAuthentication ~ userData:",
          userData
        );
        if (userData) {
          const { user, accessToken, refreshToken } = JSON.parse(userData);
          setAuth({ accessToken, refreshToken, user });
          router.replace("/home");
        } else {
          signOut();
          router.replace("/sign-in");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  usePortectedRoute(user);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await login({ email, password }).unwrap();
      const { refreshToken, accessToken, user } = response;
      console.log(
        "🚀 ~ file: AuthContext.tsx:73 ~ signIn ~ response:",
        response
      );
      dispatch(setCredentials({ ...response, user }));

      setAuth({ user, accessToken, refreshToken });

      const userData = JSON.stringify({ token: accessToken, user });
      await SecureStorage.setItemAsync("userData", userData);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      // Remove the token from AsyncStorage
      //@ts-ignore
      dispatch(logOut());
      setAuth(null);
      await SecureStorage.deleteItemAsync("userData");
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
