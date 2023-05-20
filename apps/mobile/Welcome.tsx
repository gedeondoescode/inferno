import { Text } from "react-native";
import { trpc } from "./client";

export const Welcome = () => {
	const user = trpc.getUser.useQuery({
		id: "1",
	});
	console.log(user);

	// if (user.error) console.error(user.error);
	if (user.data == null) return <Text>loading...</Text>;

	return <Text>{user.data?.name}</Text>;
};
