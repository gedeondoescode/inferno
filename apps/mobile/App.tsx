import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "ui";
import { trpc } from "./client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { Welcome } from "./Welcome";
import Constants from "expo-constants";
import SuperJSON from "superjson";

export default function App() {
	const getBaseUrl = () => {
		const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
		if (!localhost)
			throw new Error("failed to get localhost, configure it manually");
		return `http://${localhost}:5000/api/trpc/`;
	};

	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			transformer: SuperJSON,
			// change the ip address to whatever address the Metro server is running on
			// if you're using a Simulator 'localhost' should work fine
			links: [httpBatchLink({ url: getBaseUrl() })],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<View style={styles.container}>
					<Text>Open up App.tsx to start working on your app!</Text>
					<Welcome />
					<Button />
					<StatusBar style="auto" />
				</View>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
