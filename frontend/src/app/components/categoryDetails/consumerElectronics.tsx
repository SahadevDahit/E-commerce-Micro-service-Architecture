"use client"
import React from 'react'
interface consumerElectronicsComponent{
    details:any
}
const ConsumerElectronics: React.FC<consumerElectronicsComponent> = ({ details }) => {
  return (
    <>
<h6>sound:{details.sound}</h6>
<h6>battery:{details.battery}</h6>
<h6>storage:{details.storage}</h6>
<h6>chipset:{details.chipset}</h6>
<h6>processor:{details.processor}</h6>
<h6>camera:{details.camera}</h6>
<h6>connectivity:{details.connectivity}</h6>
<h6>display:{details.display}</h6>
    </>
  )
}

export default ConsumerElectronics

