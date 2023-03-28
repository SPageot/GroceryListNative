import { View, Text, KeyboardAvoidingView } from "react-native";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../components/form/Input";
import { AppButton } from "../components/blocks/AppButton";
import { PropType } from "../types/types";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../mutations/loginMutation";
import { UserStateContext } from "../hooks/useAuth";

const LoginContainer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #0f4d92;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LoginBox = styled(View)`
  height: ${(props: PropType) => (props.shouldExpand ? "500px" : "400px")};
  width: 400px;
  background-color: #191970;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  gap: 30px;
`;

const LoginInputContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const LoginInputLabel = styled(Text)`
  color: #fff;
  font-size: 20px;
`;

const ErrorContainer = styled(View)`
  width: 100%;
  height: 5%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #c83200;
  top: 150px;
`;

const ErrorMessage = styled(Text)`
  color: #fff;
  font-size: 20px;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Login = () => {
  const [willRegister, setWillRegister] = useState<boolean>();
  const { setUser } = useContext(UserStateContext);
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [
    addUser,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(ADD_USER, {
    variables: login,
  });
  const [userLogin, { data, error }] = useMutation(LOGIN_USER, {
    variables: { email: login.email, password: login.password },
  });

  useEffect(() => {
    if (data && !_.isNull(data?.loginUser)) {
      setUser(data.loginUser);
    }
  }, [data]);

  const handleError = useCallback(() => {
    if (!_.isUndefined(error?.message)) {
      return true;
    } else {
      return false;
    }
  }, [error]);

  const handleNameChange = (text: string): void => {
    if (text) {
      setLogin({ ...login, name: text });
    }
  };

  const handleEmailChange = (text: string): void => {
    if (text) {
      setLogin({ ...login, email: text });
    }
  };

  const handlePasswordChange = (text: string): void => {
    if (text) {
      setLogin({ ...login, password: text });
    }
  };

  const handleCancelPress = () => {
    setWillRegister(false);
  };

  const handleWillSignUpPress = () => {
    setWillRegister(true);
  };

  const handleSignUpPress = () => {
    if (login.name && login.email && login.password) {
      addUser(login.name, login.email, login.password);
      setLogin({
        name: "",
        email: "",
        password: "",
      });
      setWillRegister(false);
    }
  };

  const handleLogInPress = async () => {
    if (login.email && login.password) {
      try {
        await userLogin(login.email, login.password);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <LoginContainer>
        {error || _.isNull(data?.loginUser) || registerError ? (
          <ErrorContainer>
            <ErrorMessage>
              {registerError?.message ||
                error?.message ||
                "Wrong Password/Email"}
            </ErrorMessage>
          </ErrorContainer>
        ) : null}
        <LoginBox shouldExpand={willRegister}>
          {willRegister ? (
            <LoginInputContainer>
              <LoginInputLabel>Name</LoginInputLabel>
              <Input
                inputError={handleError()}
                placeholder="Enter First Name/Nickname/etc..."
                onChangeText={handleNameChange}
                defaultValue={login.name}
                inputType="default"
              />
            </LoginInputContainer>
          ) : null}
          <LoginInputContainer>
            <LoginInputLabel>Email</LoginInputLabel>
            <Input
              inputError={handleError()}
              required
              placeholder="Enter Email..."
              onChangeText={handleEmailChange}
              defaultValue={login.email}
              inputType="default"
            />
          </LoginInputContainer>
          <LoginInputContainer>
            <LoginInputLabel>Password</LoginInputLabel>
            <Input
              secureTextEntry
              inputError={handleError()}
              required
              placeholder="Enter Password..."
              onChangeText={handlePasswordChange}
              defaultValue={login.password}
              inputType="default"
            />
          </LoginInputContainer>
          <ButtonContainer>
            <AppButton
              color="#fff"
              title={willRegister ? "Cancel" : "Sign Up"}
              onPress={willRegister ? handleCancelPress : handleWillSignUpPress}
            />
            <AppButton
              color="#fff"
              title={willRegister ? "Sign Up" : "Login"}
              onPress={willRegister ? handleSignUpPress : handleLogInPress}
            />
          </ButtonContainer>
        </LoginBox>
      </LoginContainer>
    </KeyboardAvoidingView>
  );
};

export default Login;
