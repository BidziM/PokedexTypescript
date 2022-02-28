import fire from '../../assets/fire.svg'
import water from '../../assets/water.svg'
import electric from '../../assets/electric.svg'
import grass from '../../assets/grass.svg'
import ice from '../../assets/ice.svg'
import fighting from '../../assets/fighting.svg'
import poison from '../../assets/poison.svg'
import ground from '../../assets/ground.svg'
import flying from '../../assets/flying.svg'
import psychic from '../../assets/psychic.svg'
import bug from '../../assets/bug.svg'
import rock from '../../assets/rock.svg'
import ghost from '../../assets/ghost.svg'
import dragon from '../../assets/dragon.svg'
import dark from '../../assets/dark.svg'
import steel from '../../assets/steel.svg'
import fairy from '../../assets/fairy.svg'
import normal from '../../assets/normal.svg'
import { SvgProps } from 'react-native-svg'

export const POKEMON_TYPE_ICON: { [key: string]: React.FC<SvgProps> } = {
	fire: fire,
	water: water,
	electric: electric,
	grass: grass,
	ice: ice,
	fighting: fighting,
	poison: poison,
	ground: ground,
	flying: flying ,
	psychic: psychic,
	bug: bug,
	rock: rock,
	ghost: ghost,
	dragon: dragon,
	dark: dark,
	steel: steel,
	fairy: fairy,
	normal: normal,
}

const GetPokemonTypeIcon = (type: string) => POKEMON_TYPE_ICON[type.toLowerCase()];

export default GetPokemonTypeIcon;