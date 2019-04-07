import * as React from 'react'
import HTMLHead from '../components/html-head'
import FileList from '../components/file-list'
import '../layouts/index.css'

const dummy = [
  { id: '1', filename: 'a.txt', uploadedAt: '-', comment: 'test', download: (<button className="button button-outline">click</button>)},
  { id: '2', filename: 'b.txt', uploadedAt: '-', comment: 'test', download: (<button className="button button-outline">click</button>)}
]

const Index: React.FC = () => (
  <>
    <HTMLHead />
    <FileList files={dummy} />
  </>
)

export default Index
