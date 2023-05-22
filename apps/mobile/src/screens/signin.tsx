import React from "react";

import { View, SafeAreaView } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
	return (
		<SafeAreaView>
			<View>
				<SignInWithOAuth />
			</View>
		</SafeAreaView>
	);
};
