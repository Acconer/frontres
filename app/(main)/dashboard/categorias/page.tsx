'use client'

import FormCategoria from '@/src/components/categorias/FormCategoria'
import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import { useGlobal } from '@/src/store/global/store'
import dynamic from 'next/dynamic'

const Table = dynamic(() => import('../../../../src/components/categorias/TableCategorias'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})


const CategoriasPage = () => {
  const modal = useGlobal(state => state.modal)
  const setModal = useGlobal(state => state.setModal)

  return (
    <>
      <PageBreadcrumb title="Categorias" subName="Dashboard" />
      <button onClick={()=> setModal({ status: true, element: <FormCategoria /> })} className="btn bg-primary text-white uppercase font-bold w-full md:w-auto">
        Agregar categoria
      </button>
    
      { modal.status && modal.element }

      <section className='mt-6'>
        <Table />
      </section>
    </>
  )
}

export default CategoriasPage
