import { Dimensions } from 'react-native';

import Pokemon from '../../../ts/interfaces/PokemonInterface';

import About from './About/About';
import Stats from './Stats/Stats';
//import Evolution from './Evolution';

type SlideProps = {
  pokemon: Pokemon;
};

const tabs = [
  { name: 'About', slide: About },
  { name: 'Stats', slide: Stats },
];

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 48) / 2;

export { tabs, SlideProps, BUTTON_WIDTH};