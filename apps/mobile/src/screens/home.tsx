import React from "react";

import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "backend/router";

import { trpc } from "../utils/trpc";

const SignOut = () => {
	const { signOut } = useAuth();
	return (
		<View>
			<Button
				title="Sign Out"
				onPress={() => {
					signOut();
				}}
			/>
		</View>
	);
};

const currentUser: React.FC<{
	user: inferProcedureOutput<AppRouter["user"]["current"]>[number];
}> = ({ user }) => {
	return (
		<View>
			<Text>{user.email}</Text>
		</View>
	);
};

export const HomeScreen = () => {
	const { data, isLoading, error } = trpc.user.current.useQuery();
	return (
		<SafeAreaView>
			<View>
				<Text>{data?.email}</Text>
				<SignOut />
			</View>
		</SafeAreaView>
	);
};
