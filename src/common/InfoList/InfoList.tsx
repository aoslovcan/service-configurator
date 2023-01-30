import React from 'react'

type InfoListProps = {
  listData: { label: string; value: string | number | undefined }[]
}

const InfoList = ({ listData }: InfoListProps) => {
  return (
    <div className="c-info-list">
      {listData && listData.length
        ? listData.map(({ label, value }, i) => (
            <div key={i} className="row">
              <span className="c-info-list__title">{label}:</span>
              <span className="moveRight">{value}</span>
            </div>
          ))
        : null}
    </div>
  )
}

export default InfoList
