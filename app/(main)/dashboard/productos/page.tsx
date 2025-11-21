'use client'

import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import FormProduct from '@/src/components/product/FormProduct'
import { useGlobal } from '@/src/store/global/store'
import dynamic from 'next/dynamic'

const ProductosPage = () => {
  const modal = useGlobal(state => state.modal);
  const setModal = useGlobal(state => state.setModal);

  const Table = dynamic(() => import('../../../../src/components/product/TableProduct'), {
    ssr: false
  })

  return (
    <>
      <PageBreadcrumb title="Productos" subName="Dashboard" />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase w-full flex justify-center items-center lg:w-auto'
        onClick={() => setModal({ status: true, element: <FormProduct /> })}
      >
        Agregar producto al menú
      </button>

      {modal.status && modal.element}

      <section className='mt-6'>
        <Table />
      </section>

    </>
  )
}

export default ProductosPage
