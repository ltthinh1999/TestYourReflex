import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameScreenHard from './screens/GameScreenHard';
import BestScoreScreen from './screens/BestScoreScreen'
import ThemesScreen from './screens/ThemesScreen'
import LosingScreen from './screens/LosingScreen'
import DifficultyScreen from './screens/DifficultyScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ModeScreen from './screens/ModeScreen'
import GameScreen2Player from './screens/GameScreen2Player'

const App = createStackNavigator({
  StartGameScreen: {screen: StartGameScreen},
  GameScreen: {screen: GameScreen},
  GameScreenHard: {screen: GameScreenHard},
  LosingScreen: {screen: LosingScreen},
  BestScoreScreen: {screen: BestScoreScreen},
  ThemesScreen: {screen: ThemesScreen},
  DifficultyScreen: {screen: DifficultyScreen},
  LoginScreen: {screen: LoginScreen},
  SignupScreen: {screen: SignupScreen},
  ModeScreen: {screen: ModeScreen},
  GameScreen2Player: {screen: GameScreen2Player}
  },
  {
    initialRouteName: 'StartGameScreen'
  },
);

export default createAppContainer(App);