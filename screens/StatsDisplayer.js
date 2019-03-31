
import {createStackNavigator} from 'react-navigation';
import Choose from './StatsDisplayerUtils/Choose';
import Display from './StatsDisplayerUtils/Display';

export default createStackNavigator({
	Choose: { screen: Choose,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Display: { screen: Display }
});