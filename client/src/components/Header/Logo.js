import React from 'react'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export default function Logo() {
  return (
    <div>
      <a href="/" className="flex items-center gap-1">
          <AssignmentOutlinedIcon  className="h-8 w-8 md:h-10 md:w-10" sx={{color:"blue"}}/>

          <span className="hidden text-2xl font-bold text-blue-400 md:block">
            Tasks
          </span>
        </a>
    </div>
  )
}
