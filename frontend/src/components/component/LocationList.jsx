import React from 'react'

const LocationList = ({address, status, onClick}) => {
  return (
    <div>
       <li className='flex flex-row justify-between items-center my-4 cursor-pointer' onClick={onClick}>
          <p className='text-gray-600 font-medium'>{address}</p>
          <p className={`${status === 'Complete' ? 'text-green-500' : 'text-blue-600'} font-medium`}>{status}</p>
       </li>
       <hr className='my-2'/>
    </div>
  )
}

export default LocationList
