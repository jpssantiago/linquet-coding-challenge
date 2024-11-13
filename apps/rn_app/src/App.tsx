import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { View } from "react-native"

import { SignInScreen } from "./screens/sign-in-screen"
import { SignUpScreen } from "./screens/sign-up-screen"
import { ChatListScreen } from "./screens/chat-list-screen"
import { ChatScreen } from "./screens/chat-screen"

type RootStackParamList = {
  SignIn: undefined
  SignUp: undefined
  ChatList: undefined
  ChatScreen: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: "Sign In",
            headerLeft: () => <View />,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: "Sign Up",
            headerLeft: () => <View />,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{
            title: "Chats",
            headerLeft: () => <View />,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: "Chat",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}