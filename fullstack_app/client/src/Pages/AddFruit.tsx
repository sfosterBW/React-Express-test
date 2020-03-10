import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Alert from '../Components/Alert/Alert'
import Banner from '../Components/Banner/Banner'
import Form from '../Components/Form/Form'
import styles from '../Components/App/App.module.css'

interface Props extends RouteComponentProps {
  title: string
}

const AddFruit: FC<Props> = ({ title }) => {
  return (
    <div className={styles.main}>
      <Banner flavour="flavourTwo" size="large" title={title}/>
      <Alert />
      <Form />
    </div>
  )
}

export default AddFruit
