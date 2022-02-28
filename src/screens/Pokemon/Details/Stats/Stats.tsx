import React from 'react';

import Text from '../../../../components/Text/text';
import { SlideProps } from '../tabs';

import { Stat, StatGraph, StatLine, StatValue } from './styles';

const BaseStats = ({ pokemon }: SlideProps) => {
  return (
    <>
      {pokemon.stats.map(stat => (
        <Stat key={stat.stat.url}>
          <Text color="grey" style={{ width: 130 }}>
            {stat.stat.name}
          </Text>

          <StatGraph>
            <Text bold style={{ width: 30, textAlign: 'right' }}>
              {stat.base_stat}
            </Text>

            <StatLine>
              <StatValue width={stat.base_stat} />
            </StatLine>
          </StatGraph>
        </Stat>
      ))}
    </>
  );
};

export default BaseStats;