import React from 'react'

import Count from '~/components/access-counter/atoms/Count'
export default {
  title: 'AccessCounter',
  component: Count,
}
export const Num = (): JSX.Element => <Count num="1" />
