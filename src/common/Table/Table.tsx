import React from 'react'
import { TableOptions } from '../../types/types'

type TableProps = {
  id: string
  tableData: TableOptions[]
}

const Table = ({ id, tableData }: TableProps) => {
  return (
    <table id={id} className="c-table">
      {tableData.map(({ title, value, cellClass }) => (
        <tr>
          <td>{title}</td>
          <td className={`${cellClass}`}>{value}</td>
        </tr>
      ))}
    </table>
  )
}

export default Table
