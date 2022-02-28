
const numberOfZeros = 3
const pokemonId = (id: number):string => {
    const pokemonId = id.toString()
    return "#" + pokemonId.padStart(numberOfZeros, "0")
}
    //(Array(numberOfZeros).join("0") + id).slice(-numberOfZeros).toString;

export default pokemonId;