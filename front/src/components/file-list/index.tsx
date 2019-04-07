import * as React from 'react'

import Table from '../table'

export interface FileListProps {
  files: {
    id: string,
    filename: string,
    comment: string,
    uploadedAt: string,
    download: React.ReactChild
  }[]
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const header = [
    { order: 1, field: 'filename', title: 'Name' },
    { order: 2, field: 'comment', title: 'Comment' },
    { order: 3, field: 'uploadedAt', title: 'Uploaded At' },
    { order: 4, field: 'download', title: 'Download' },
  ]
  return (
    <div className="container">
      <div className="row">
        <Table head={header} body={files} />
      </div>
    </div>
  )
}

export default FileList
