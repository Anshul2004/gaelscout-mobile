import {createStackNavigator} from 'react-navigation';
import Choose from './Notes/NotesHome';
import Display from './Notes/ShowNote';

export default createStackNavigator({
	Choose: { screen: Choose,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Display: { screen: Display,
		navigationOptions: ({ navigation }) => ({
			header: null
		}) 
	}
});
