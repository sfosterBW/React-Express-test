import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Banner from '../Components/Banner/Banner'
import NewForm from '../Components/Form/NewForm'

interface Props extends RouteComponentProps {
  title: string
}

const AddFruit: FC<Props> = ({ title }) => {
  return (
    <>
      <Banner flavour="flavourTwo" size="large" title={title}/>
      <NewForm />
    </>
  )
}

export default AddFruit
