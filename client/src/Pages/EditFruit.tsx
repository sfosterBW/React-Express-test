import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Banner from '../Components/Banner/Banner'
import List from '../Components/List/List'

interface Props extends RouteComponentProps {
  title: string
}

const EditFruit: FC<Props> = ({ title}) => {
  return (
    <>
      <Banner theme="three" size="large" title={title} />
      <List />
    </>
  )
}

export default EditFruit
