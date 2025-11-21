import React from 'react'
import marcaAguaImage from '@/src/assets/images/pagina_fondo.png'
import Image from 'next/image'

const MarcaAgua = () => {
  return (
    <div className='absolute mt-32'>
        <Image src={marcaAguaImage} alt='marca de agua' className='w-full h-full opacity-10' />
    </div>
  )
}

export default MarcaAgua
