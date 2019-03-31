import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from "./screens/Home";
import MatchPredictor from "./screens/MatchPredictor";
import StatsDisplayer from "./screens/StatsDisplayer";
import tabBarIcon from "./utils/tabBarIcon";

export default createAppContainer(
	createMaterialBottomTabNavigator(
		{
			Home: {
				screen: Home,
				navigationOptions: {
					tabBarLabel: "Home",
					tabBarIcon: tabBarIcon("home")
				}
			},
			MatchPredictor: {
				screen: MatchPredictor,
				navigationOptions: {
					tabBarLabel: "Match Predictor",
					tabBarIcon: tabBarIcon("device-hub")
				}
			},
			StatsDisplayer: {
				screen: StatsDisplayer,
				navigationOptions: {
					tabBarLabel: "Statistics",
					tabBarIcon: tabBarIcon("insert-chart")
				}
			}
		},
		{
			initialRouteName: "Home",
			activeColor: "#0d0123",
			inactiveColor: "#595959",
			order: ["Home", "MatchPredictor", "StatsDisplayer"],
			shifting: true,
			barStyle: { backgroundColor: "#f3f3f3" }
		}
	)
);