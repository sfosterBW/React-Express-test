import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders, rootInitialState } from 'utils/test-utils'

import { list } from '../../utils/test-helper'

import List from './List'

//https://www.rrebase.com/posts/full-guide-to-testing-javascript-react
//https://github.com/testing-library/react-testing-library#complex-example

describe('the List component', () => {
  describe('works with no fruit', () => {

    it('renders with the right structure', () => {
      const { queryAllByTestId, getByText } = renderWithProviders(<List />)
      expect(queryAllByTestId('item')).toHaveLength(0)
      expect(getByText("Nothing here...")).toBeInTheDocument()
    })
  })

  describe('works with fruit', () => {
    it('renders with the right structure', () => {
      const { getAllByTestId } = renderWithProviders(<List />, {
        ...rootInitialState,
        fruit: list
      })
      expect(getAllByTestId('item')).toHaveLength(list.length)
      getAllByTestId('item-title').forEach((title: any, i: number) =>
        expect(title).toHaveTextContent(list[i].name)
      )
      getAllByTestId('item-best').forEach((best: any, i: number) =>
        expect(best).toHaveTextContent(String(list[i].best))
      )
    })

    it('filtering changes the list length', () => {
      const { getByTestId, getAllByTestId } = renderWithProviders(<List />, {
        ...rootInitialState,
        fruit: list
      })
      const bestList = list.filter(i => i.best === true)
      const notBestList = list.filter(i => i.best === false)

      fireEvent.click(getByTestId('best-filter'))
      expect(getAllByTestId('item')).toHaveLength(bestList.length)

      fireEvent.click(getByTestId('not-best-filter'))
      expect(getAllByTestId('item')).toHaveLength(notBestList.length)

      fireEvent.click(getByTestId('all-filter'))
      expect(getAllByTestId('item')).toHaveLength(list.length)
    })
  })
})
