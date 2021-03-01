import { addParameters } from '@storybook/react'
import '@storybook/addon-console'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../../../src/styles/globals.scss'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
