import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { emptyList, list } from '../../utils/test-helper'

import List from './List'

afterEach(cleanup)

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the List component', () => {
  describe('works with no fruit', () => {
    const component = <List fruits={emptyList} />

    it('renders with the right structure', () => {
      const { queryAllByTestId, getByText } = render(component)
      expect(queryAllByTestId('item')).toHaveLength(0)
      expect(getByText("Nothing here...")).toBeInTheDocument()
    })

    it('renders the same as last time', () => {
      const { container } = render(component)
      expect(container).toMatchSnapshot()
    })
  })

  describe('works with fruit', () => {
    const component = <List fruits={list} />

    it('renders with the right structure', () => {
      const { getAllByTestId } = render(component)
      expect(getAllByTestId('item')).toHaveLength(list.length)
      getAllByTestId('item-title').forEach((title, i) =>
        expect(title).toHaveTextContent(list[i].name)
      )
      getAllByTestId('item-best').forEach((best, i) =>
        expect(best).toHaveTextContent(String(list[i].best))
      )
    })

    it('filtering changes the list length', () => {
      const { getByTestId, getAllByTestId } = render(component)
      const bestList = list.filter(i => i.best === true)
      const notBestList = list.filter(i => i.best === false)

      fireEvent.click(getByTestId('best-filter'))
      expect(getAllByTestId('item')).toHaveLength(bestList.length)

      fireEvent.click(getByTestId('not-best-filter'))
      expect(getAllByTestId('item')).toHaveLength(notBestList.length)

      fireEvent.click(getByTestId('all-filter'))
      expect(getAllByTestId('item')).toHaveLength(list.length)
    })

    it('renders the same as last time', () => {
      const { container } = render(component)
      expect(container).toMatchSnapshot()
    })
  })
})