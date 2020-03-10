import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import { IFruit } from '../utils/interfaces'
import Banner from '../Components/Banner/Banner'
import Table from '../Components/Table/Table'
import styles from '../Components/App/App.module.css'

interface Props extends RouteComponentProps {
  fruits: IFruit[]
  title: string
}

const EditFruit: FC<Props> = ({fruits, title}) => {
  return (
    <div className={styles.main}>
      <Banner flavour="flavourThree" size="large" title={title} />
      <Table fruits={fruits} />
    </div>
  )
}

export default EditFruit
