import React from 'react'

const TitleComp = ({ heading, des }) => {
  return (
    <div className='dashboard-sub-container flex flex-col items-start gap-1 border-b border-black/10'>
        <h2 className='text-2xl text-background font-bold'>{heading}</h2>
        <p className='max-w-4xl text-light'>{des}</p>
    </div>
  )
}

export default TitleComp