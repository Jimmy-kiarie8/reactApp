import { createStackNavigator } from 'react-navigation'
import MenuContainer from './Menu'
import UserLoginForm from '../../components/auth/Login'
import SignUpForm from '../../components/auth/Signup'
const EntryStack = createStackNavigator(
    {
        UserLogin: {
            screen: UserLoginForm,
        },
        SignUpForm: {
            screen: SignUpForm,
        },
    },
    {
        headerMode: 'float',
    }
);
export const RootStack = createStackNavigator(
    {
        EntryStack: { screen: EntryStack },
        MenuStack: { screen: MenuContainer },
    },
    {
        headerMode: 'none',
        initialRouteName: 'AppStack',
    }
)