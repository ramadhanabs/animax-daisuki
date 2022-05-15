/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { AddNewCollection } from './index'

test('Button should be disabled if there is no input', () => {
  render(<AddNewCollection />)
})
