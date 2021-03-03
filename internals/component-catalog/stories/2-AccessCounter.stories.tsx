import React from 'react'
import Count from '~/components/access-counter/atoms/Count'
import Counters from '~/components/access-counter/molecules/Counters'
import CountersWithText from '~/components/access-counter/organisms/CountersWithText'
import { withKnobs, number } from '@storybook/addon-knobs'

export default {
  title: 'AccessCounter',
  component: Count,
  decorators: [withKnobs],
}
export const Num = (): JSX.Element => <Count num="1" />

export const Nums = (): JSX.Element => <Counters num={11} />

export const WithText = (): JSX.Element => (
  <CountersWithText num={number('Count', 122)} />
)
