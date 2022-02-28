type Gender = {
  gender: "genderless" | "male" | "female";
  rate?: number;
};

const getPokemonGenderStats = (gender_rate: number): Gender[] => {
  //The chance of this Pokémon being female, in eighths; or -1 for genderless.
  if (gender_rate === -1) {
    return [
      {
        gender: "genderless",
      },
    ];
  }
  const femalePercentage = (gender_rate / 8) * 100;
  const malePercentage = 100 - femalePercentage;

  return [
    { gender: "male", rate: malePercentage },
    { gender: "female", rate: femalePercentage },
  ];
};

export default getPokemonGenderStats;
