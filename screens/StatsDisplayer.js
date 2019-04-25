
import {createStackNavigator} from 'react-navigation';
import Choose from './StatsDisplayerUtils/Choose';
import CCWM from './StatsDisplayerUtils/StatsPages/CCWM';
import MaxScore from './StatsDisplayerUtils/StatsPages/MaxScore';
import Rank from './StatsDisplayerUtils/StatsPages/Rank';

export default createStackNavigator({
	Choose: { screen: Choose,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	CCWM: { screen: CCWM,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	MaxScore: { screen: MaxScore,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Rank: { screen: Rank,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
});