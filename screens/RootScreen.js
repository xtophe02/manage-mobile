import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { CSSGlobalStyles } from "../constants/style";
import { AuthContext } from "../store/auth-context";
import AllExpenses from "./AllExpenses";
import LoginScreen from "./LoginScreen";
import ManageExpense from "./ManageExpense";
import { useFonts } from "expo-font";

import LogoutScreen from "./LogoutScreen";
import { Ionicons } from "@expo/vector-icons";
import ExpenseSummary from "./ExpenseSummary";

const Stack = createNativeStackNavigator();
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 50 }}
      source={require("../assets/images/manage.png")}
      resizeMode="contain"
    />
  );
}
function LogoutImage({ logout, user }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Pressable onPress={() => setShow(!show)}>
        {/* <LougoutIcon user={user} /> */}
        <Ionicons
          name="exit-outline"
          size={18}
          color={CSSGlobalStyles.colors.white}
        />
      </Pressable>
      {show && <LogoutScreen logout={logout} />}
    </>
  );
}

function Navigation() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: CSSGlobalStyles.colors.primary500,
        },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
      ) : (
        <>
          <Stack.Screen
            name="AllExpenses"
            component={AllExpenses}
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
              headerRight: (props) => (
                <LogoutImage logout={logout} user={user} />
              ),
            }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{
              presentation: "modal",
              headerTintColor: CSSGlobalStyles.colors.white,
            }}
          />
          <Stack.Screen
            name="ExpenseSummary"
            component={ExpenseSummary}
            options={{
              presentation: "card",
              headerTintColor: CSSGlobalStyles.colors.white,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function RootScreen() {
  const [fontsLoaded] = useFonts({
    mulish: require("../assets/fonts/Mulish.ttf"),
    "mulish-bold": require("../assets/fonts/Mulish-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}
