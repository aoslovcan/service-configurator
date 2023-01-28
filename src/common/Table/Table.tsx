import React from 'react'
import { TableOptions } from '../../types/types'

type TableProps = {
  id: string
  tableData : TableOptions[];
}

const Table = ({ id }: TableProps) => {
  const tableData = [
    {
      title: 'Zamjena ulja i filtera',
      value: '65,00 €',
      cellClass: 'moveRight',
    },
    {
      title: 'Promjena pakni',
      value: '65,00 €',
      cellClass: 'moveRight',
    },

    {
      title: '',
      value: (
        <>
          <span className="text-color-grey-200">Popust30%:</span> -37,50 €
        </>
      ),
      cellClass: 'moveRight',
    },
    {
      title: '',
      value: (
        <>
          <span className="text-color-grey-200">Ukupno:</span>{' '}
          <span className="total">87,50 €</span>
        </>
      ),
      cellClass: 'moveRight',
    },
  ]

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
