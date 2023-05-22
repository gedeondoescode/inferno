import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { Button, View } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });

	const handleSignInWithDiscordPress = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();
			if (createdSessionId) {
				setActive({ session: createdSessionId });
			} else {
				// Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
				throw new Error(
					"There are unmet requirements, modifiy this else to handle them"
				);
			}
		} catch (err) {
			console.log(JSON.stringify(err, null, 2));
			console.log("error signing in", err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<View>
			<Button
				title="Sign in with Discord"
				onPress={handleSignInWithDiscordPress}
			/>
		</View>
	);
};

export default SignInWithOAuth;
