import { View, Text, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../components/form/Input";
import { AppButton } from "../components/blocks/AppButton";
import { PropType } from "../types/types";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../mutations/loginMutation";

const LoginContainer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #0f4d92;
  justify-content: center;
  align-items: center;
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

const ButtonContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Login = () => {
  const [willRegister, setWillRegister] = useState<boolean>();
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [addUser] = useMutation(ADD_USER, {
    variables: login,
  });

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

  const handleLogInPress = () => {
    if (login.email && login.password) {
      console.log(login.email, login.password);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <LoginContainer>
        <LoginBox shouldExpand={willRegister}>
          {willRegister ? (
            <LoginInputContainer>
              <LoginInputLabel>Name</LoginInputLabel>
              <Input
                placeholder="Enter First Name/Nickname/etc..."
                onChangeText={handleNameChange}
                defaultValue={login.name}
                type="default"
              />
            </LoginInputContainer>
          ) : null}
          <LoginInputContainer>
            <LoginInputLabel>Email</LoginInputLabel>
            <Input
              placeholder="Enter Email..."
              onChangeText={handleEmailChange}
              defaultValue={login.email}
              type="default"
            />
          </LoginInputContainer>
          <LoginInputContainer>
            <LoginInputLabel>Password</LoginInputLabel>
            <Input
              placeholder="Enter Password..."
              onChangeText={handlePasswordChange}
              defaultValue={login.password}
              type="default"
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
