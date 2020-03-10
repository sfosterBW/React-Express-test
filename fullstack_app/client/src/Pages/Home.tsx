import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Banner from '../Components/Banner/Banner'
import styles from '../Components/App/App.module.css'

interface Props extends RouteComponentProps {
  title: string
}

const Home: FC<Props> = ({ title }) => {
  return (
    <div className={styles.main}>
      <Banner size="large" title={title}/>
    </div>
  )
}

export default Home
