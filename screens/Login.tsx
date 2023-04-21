import { View, Text, KeyboardAvoidingView } from "react-native";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
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
  width: 400px;
  background-color: #191970;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

  ${(props: PropType) =>
    props.shouldExpand
      ? css`
          gap: 50px;
          height: 700px;
        `
      : css`
          gap: 30px;
          height: 400px;
        `};
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

const PasswordRulesContainer = styled(View)`
  width: 90%;
`;

const PasswordRules = styled(Text)`
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 20px;
`;

const Login = () => {
  const [willRegister, setWillRegister] = useState<boolean>();
  const { loginUser } = useContext(UserStateContext);
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addUser, { error: registerError, reset }] = useMutation(ADD_USER);
  const [userLogin, { data, error, loading }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (data && !_.isNull(data?.loginUser?.token)) {
      loginUser(data.loginUser);
    }
  }, [data]);

  const handleError = useCallback(() => {
    if (!_.isUndefined(error?.message)) {
      return true;
    } else {
      return false;
    }
  }, [error]);

  const handleNameChange = useCallback(
    (text: string): void => {
      if (text) {
        setLogin({ ...login, name: text });
        reset();
      }
    },
    [login.name]
  );

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
    setLogin({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSignUpPress = () => {
    if (
      login.name &&
      login.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
      login.password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      )
    ) {
      addUser({
        variables: login,
      });
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
        await userLogin({
          variables: { email: login.email, password: login.password },
        });
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
          {willRegister ? (
            <PasswordRulesContainer>
              <PasswordRules>
                password must contain a single digit from 1 to 9.{"\n"} password
                must contain one lowercase letter. {"\n"}password must contain
                one uppercase letter.{"\n"} password must contain one special
                character. {"\n"}password must be 8-16 characters long
              </PasswordRules>
            </PasswordRulesContainer>
          ) : null}
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
