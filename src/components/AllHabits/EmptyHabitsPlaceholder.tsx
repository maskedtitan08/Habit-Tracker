import { ListIcon } from '@/Assets/ListIcon'
import React from 'react'
import { defaultColor } from '../../../color'

const EmptyHabitsPlaceholder = () => {
  return (
    <div className='flex justify-center items-center p-5 flex-col'>
        <ListIcon color={defaultColor.textColor} />
        <span className='text-[13px] text-gray-500'>
            Nothing scheduled for this day
        </span>
    </div>
  )
}

export default EmptyHabitsPlaceholder