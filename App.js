import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

import AuthContextProvider, { AuthContext } from "./store/auth-context";

import RootScreen from "./screens/RootScreen";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <NavigationContainer>
            <RootScreen />
          </NavigationContainer>
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  );
}
