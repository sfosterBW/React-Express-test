import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import { IFruit } from '../utils/interfaces'
import Banner from '../Components/Banner/Banner'
import List from '../Components/List/List'

interface Props extends RouteComponentProps {
  fruits: IFruit[]
  title: string
}

const EditFruit: FC<Props> = ({fruits, title}) => {
  return (
    <>
      <Banner flavour="flavourThree" size="large" title={title} />
      <List fruits={fruits} />
    </>
  )
}

export default EditFruit
