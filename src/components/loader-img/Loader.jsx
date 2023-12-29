import React from 'react'
import Spinner from '../../assets/images/svg/loader.svg'
const Loader = () => {
  return (
    <div className='bg-black bg-opacity-50 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 z-50'>
      <dir>
        <img src={Spinner} alt="Loading..." className='h-[100px]' />
      </dir>
    </div>
  )
}

export default Loader
