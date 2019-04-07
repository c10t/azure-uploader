import * as React from 'react'

export interface TableProps {
  head: { title: string, field: string, order: number }[]
  body: { id: string, [key: string]: React.ReactChild }[]
}

const Table: React.FC<TableProps> = ({head, body}) => {
  const sorted = [ ...head ].sort((a, b) => a.order - b.order)
  return (
    <table>
      <thead>
        <tr>
          {sorted.map(({ title, order }) => (
            <th key={order}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map(b => (
          <tr key={b.id}>
            {sorted.map(({ order, field }) => (<td key={order}>{b[field]}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
