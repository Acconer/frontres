'use client';

{/* CAJA, PERSONAL, PRODUCTOS, CATEGORIAS */}

import ModalCloseCaja from '@/src/components/caja/ModalClose'
import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import { useGlobal } from '@/src/store/global/store'
import dynamic from 'next/dynamic'
import SummaryProducts from '@/src/components/box/SummaryProducts';
import { boxPreview } from '../../../../src/Objects/index';
import { useBoxStore } from '@/src/store/box/store';

const CajaPage = () => {
  
  const modal = useGlobal(state => state.modal)
  const setModal = useGlobal(state => state.setModal);
  const boxPreview = useBoxStore(state => state.boxPreview)
  
    const Table = dynamic(() => import('@/src/components/box/TableBox'), { ssr: false })

  return (
    <>
      <PageBreadcrumb title="Caja" subName='Dashboard' />
      {
        boxPreview && boxPreview.length > 0 && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase mb-5" onClick={() => setModal({ status: true, element: <ModalCloseCaja />})}>
          Cerrar caja
          </button>
        )
      }

    {
        modal.status && modal.element
      }
      
      <div className='my-6' >
        <h1 className='text-2xl font-bold'>Resumen de productos</h1>
        <p className='text-gray-500 mb-6'>Resumen de productos vendidos en la caja</p>
        <div className='grid grid-cols-1'>
          <SummaryProducts />
        </div>
      </div>

    <Table />
    </>
  )
}

export default CajaPage
