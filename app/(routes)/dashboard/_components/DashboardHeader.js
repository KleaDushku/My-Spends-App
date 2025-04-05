import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-4 border-b flex justify-between items-center bg-gray-50 shadow-sm'>
        <div className='flex items-center space-x-4'>
          <h1 className='text-xl font-semibold text-gray-800'>
          <span className='text-purple-600'> Welcome to</span>
            <span className='text-purple-600'> My</span>
            <span className='text-pink-500'> Spends</span>
            <span className='text-purple-600'> App</span>
          </h1>
        </div>
        
        <div className='flex items-center space-x-4'>
          <div className='hidden md:flex items-center space-x-2 bg-white px-3 py-1 rounded-full border'>
            <div className='w-2 h-2 rounded-full bg-green-400'></div>
            <span className='text-xs text-gray-600'>Active</span>
          </div>
          <div className='hover:bg-gray-100 p-1 rounded-full transition-all'>
            <UserButton 
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                  userButtonBox: "flex items-center",
                }
              }}
            />
          </div>
        </div>
    </div>
  )
}

export default DashboardHeader