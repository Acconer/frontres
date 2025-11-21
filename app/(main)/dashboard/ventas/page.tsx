import SummaryProducts from '@/src/components/box/SummaryProducts'
import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import TableVentas from '@/src/components/ventas/TableVentas'
import Link from 'next/link'
import React from 'react'

const VentasFinalizadas = () => {
  return (
    <>
      <PageBreadcrumb title="Ventas Finalizadas" subName="Dashboard" />
      <div className='flex justify-between flex-col md:flex-row gap-4'>
        <Link
          href='/menu'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase'
        >
          Crear orden
        </Link>
        <Link
          href='/dashboard/ordenes'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded uppercase'
        >
          Ordenes en proceso
        </Link>
      </div>

      <TableVentas />
    </>
  )
}

export default VentasFinalizadas
