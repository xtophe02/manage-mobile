import { useCallback, useContext, useState } from "react";
import { Linking, Alert } from "react-native";

import { FORGOT_PASSWORD_URL } from "../constants/constants";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { loginHttp } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import Login from "../components/Login/Login";
import { fecthAboutMe } from "../util/http";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: {
      value: "",
      // value: "carringtonwalker@wiseman.com",
      isValid: true,
    },

    password: {
      value: "",
      // value: "rh4AyTVzqv32@j^S*Y9@",
      isValid: true,
    },
  });
  const { authenticate } = useContext(AuthContext);

  function inputChangeHandler(identifier, enteredValue) {
    setInputs((prev) => ({
      ...prev,
      [identifier]: { value: enteredValue, isValid: true },
    }));
  }
  const forgotPasswordHandler = useCallback(async () => {
    const supported = await Linking.canOpenURL(FORGOT_PASSWORD_URL);

    if (supported) {
      await Linking.openURL(FORGOT_PASSWORD_URL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${FORGOT_PASSWORD_URL}`);
    }
  }, []);

  async function loginHandler() {
    const emailIsValid =
      inputs.email.value.trim().length > 0 && inputs.email.value.includes("@");
    const passwordIsValid = inputs.password.value.trim().length > 0;

    if (!emailIsValid || !passwordIsValid) {
      setInputs((prev) => ({
        ...prev,
        email: { ...prev.email, isValid: emailIsValid },
        password: { ...prev.password, isValid: passwordIsValid },
      }));

      return;
    }

    setLoading(true);

    try {
      const data = await loginHttp(inputs.email.value, inputs.password.value);
      const user = await fecthAboutMe(data.token);
      authenticate(data.token, user);
    } catch (error) {
      Alert.alert(
        "Authentication",
        "Could not log you in. Please check your credentials or try again later!"
      );
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <Login
      onPassword={forgotPasswordHandler}
      onLogin={loginHandler}
      onChangeInput={inputChangeHandler}
      inputs={inputs}
    />
  );
}
