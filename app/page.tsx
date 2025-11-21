import { redirect } from 'next/navigation'
import React from 'react'

const PageHome = () => {
    redirect('/auth/login')
  return (
    <div>
      Hola
    </div>
  )
}

export default PageHome
