"use client"
import React from 'react'
interface apparelAndFashionComponent{
    details:any
}
const ApparelAndFashion: React.FC<apparelAndFashionComponent> = ({ details }) => {
  return (
    <>
   {details.fitStyle?<h6>FitStyle: {details.fitStyle}</h6>:<></>}
   <div>
      <h6>Sizes</h6>
      <div style={{ display: 'flex' }}>
        {details?.sizes.map((size: string, index: number) => (
          <p key={index} style={{ marginRight: '10px' }}>
            {size}
          </p>
        ))}
      </div>
    </div>
    
    <div>
      <h6>DesignFeatures</h6>
      <div style={{ display: 'flex' }}>
        {details?.designFeatures.map((size: string, index: number) => (
          <p key={index} style={{ marginRight: '10px' }}>
            {size}
          </p>
        ))}
      </div>
    </div>
    </>
  )
}

export default ApparelAndFashion