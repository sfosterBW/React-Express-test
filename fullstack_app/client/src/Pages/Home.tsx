import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Banner from '../Components/Banner/Banner'

interface Props extends RouteComponentProps {
  title: string
}

const Home: FC<Props> = ({ title }) => <Banner size="large" title={title}/>

export default Home
