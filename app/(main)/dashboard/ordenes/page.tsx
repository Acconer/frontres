'use client'

import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const OrdenesPage = () => {

  const Table = dynamic(() => import('@/src/components/orders/TableOrders'), { ssr: false })

  return (
      <>
          <PageBreadcrumb title="Ordenes" subName="Dashboard" />
          <div className="flex justify-between flex-col md:flex-row gap-4">
              <Link
                  href="/menu"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase">
                  Crear orden
              </Link>
              <Link
                  href="/dashboard/ventas"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded uppercase">
                  Ordenes Finalizadas
              </Link>
          </div>

          <Table />
      </>
  );
}

export default OrdenesPage
