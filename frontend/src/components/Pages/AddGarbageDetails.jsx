import React from 'react'
import { CardWithForm } from '../mini-components/GarbageCard'
import { GarbageCheckbox } from '../mini-components/GarbageCheckbox'

const AddGarbageDetails = () => {
  return (
    <div>
      <CardWithForm />
      <AddGarbageDetails/>
    </div>
    
  )
}

export default AddGarbageDetails