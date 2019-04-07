import * as React from 'react'
import Helmet from 'react-helmet'

const HTMLHead: React.FC = () => (
  <Helmet>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,300italic,700,700italic" />
    <link rel="stylesheet" href="https://cdn.rawgit.com/necolas/normalize.css/master/normalize.css"></link>
    <link rel="stylesheet" href="https://cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css" />
  </Helmet>
)

export default HTMLHead
