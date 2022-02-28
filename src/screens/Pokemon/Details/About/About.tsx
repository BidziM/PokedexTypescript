import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Foundation as Icon } from '@expo/vector-icons';

import { SlideProps } from '../tabs';
import Text from '../../../../components/Text/text';
import convertValues from '../../../../utilites/convertValue';
import getPokemonGenderStats from '../../../../utilites/genderStats';

import {
  Section,
  SectionTitle,
  SectionContent,
  SectionSubtitle,
  SectionText,
  ShadowContainer,
} from './styles';

const About = ({ pokemon }: SlideProps) => {
  const pokemonFormatted = useMemo(() => {
    return {
      ...pokemon,
      heightInMeters: convertValues.decimeterToMeter(pokemon.height),
      weightInKilograms: convertValues.hectogramsToKilograms(pokemon.weight),
    };
  }, [pokemon]);

  const pokemonGendersRate = getPokemonGenderStats(pokemon.gender_rate);

  return (
    <>
      <Section>
        <Text>{pokemonFormatted.flavor_text_entries[6].flavor_text}</Text>
      </Section>

      <Section>
        <ShadowContainer>
          <View>
            <Text color="grey" bold style={{ marginBottom: 8 }}>
              Height
            </Text>

            <SectionText>
              {pokemonFormatted.heightInMeters} m
            </SectionText>
          </View>

          <View>
            <Text color="grey" bold style={{ marginBottom: 8 }}>
              Weight
            </Text>

            <SectionText>
              {pokemonFormatted.weightInKilograms} kg
            </SectionText>
          </View>
        </ShadowContainer>
      </Section>

      <Section>
        <SectionTitle>Breeding</SectionTitle>

        <SectionContent>
          <SectionSubtitle>Gender</SectionSubtitle>

          {pokemonGendersRate.map(gender => (
            <SectionText key={gender.gender} style={{ marginRight: 16 }}>
              {gender.gender === 'genderless' ? (
                <Text bold>Genderless</Text>
              ) : (
                <>
                  <Icon
                    name={
                      gender.gender === 'male' ? 'male-symbol' : 'female-symbol'
                    }
                    color={gender.gender === 'male' ? '#6890F0' : '#EE99AC'}
                    size={16}
                  />
                  {'  '}
                  {gender.rate}%
                </>
              )}
            </SectionText>
          ))}
        </SectionContent>

        <SectionContent>
          <SectionSubtitle>Egg Groups</SectionSubtitle>

          {pokemon.egg_groups.map(egg_group => (
            <SectionText key={egg_group.url} style={{ marginRight: 8 }}>
              {egg_group.name.toLocaleUpperCase()}
            </SectionText>
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Training</SectionTitle>

        <SectionContent>
          <SectionSubtitle>Base EXP</SectionSubtitle>
          <SectionText>{pokemon.base_experience}</SectionText>
        </SectionContent>
      </Section>
    </>
  );
};

export default About;