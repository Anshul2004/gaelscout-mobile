import {createStackNavigator} from 'react-navigation';
import Choose from './TeamInfoUtils/Choose';
import Display from './TeamInfoUtils/Display';

export default createStackNavigator({
	Choose: { screen: Choose,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Display: { screen: Display }
});
