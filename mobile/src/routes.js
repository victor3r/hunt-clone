import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './pages/main';

export default createAppContainer(createStackNavigator(
  {
    Main,
  }
));