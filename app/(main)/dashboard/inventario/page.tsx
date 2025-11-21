'use client'

import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import FormIngredient from '@/src/components/inventario/FormIngredient'
import { useGlobal } from '@/src/store/global/store'
import dynamic from 'next/dynamic'
import React from 'react'

const InventarioPage = () => {
  const modal = useGlobal(state => state.modal)
  const setModal = useGlobal(state => state.setModal)

  const Table = dynamic(() => import('../../../../src/components/inventario/TableInventario'), {
    ssr: false
  })

  return (
    <>
      <PageBreadcrumb title="Inventario" subName="Dashboard" />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase w-full flex justify-center items-center lg:w-auto'
        onClick={ () => setModal({status: true, element: <FormIngredient />}) }
      >
        Agregar ingrediente
      </button>

      {modal.status && modal.element}

      <section className="mt-5">
        <Table />
      </section>
    </>
  )
}

export default InventarioPage
