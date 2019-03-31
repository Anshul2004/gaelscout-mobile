import {createStackNavigator} from 'react-navigation';
import Choose from './MatchPredictorUtils/Choose';
import Display from './MatchPredictorUtils/Display';

export default createStackNavigator({
	Choose: { screen: Choose,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Display: { screen: Display }
});