import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Alert from '../Components/Alert/Alert'
import Banner from '../Components/Banner/Banner'
import Form from '../Components/Form/Form'

interface Props extends RouteComponentProps {
  title: string
}

const AddFruit: FC<Props> = ({ title }) => {
  return (
    <>
      <Banner flavour="flavourTwo" size="large" title={title}/>
      <Alert />
      <Form />
    </>
  )
}

export default AddFruit
