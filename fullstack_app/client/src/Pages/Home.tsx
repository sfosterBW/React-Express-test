import React, { FC } from 'react'
import { RouteComponentProps} from '@reach/router'
import Banner from '../Components/Banner/Banner'

interface Props extends RouteComponentProps {
  title: string
}

const Home: FC<Props> = ({ title }) => {
  return(
    <>
      <Banner size="large" title={title}/>
      <div className="card-grid-wrapper">
        <h2>
          What does it do?
        </h2>
        <div className="card-grid">
          <div className="card">
            <h3>
              Add Fruit to the dashboard
            </h3>
            <p>
              You can add any Fruit to the dashboard very easily.
            </p>
          </div>
          <div className="card">
            <h3>
              Edit your Fruit
            </h3>
            <p>
              Once you've added fruit you can update any details and remove it if necessary.
            </p>
          </div>
          <div className="card">
            <h3>
              Rank the Fruit
            </h3>
            <p>
              You can pick which Fruit is best and then you know which ones are the best ones.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
