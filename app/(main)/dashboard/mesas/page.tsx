'use client'

import React from 'react'
import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb';
import dynamic from "next/dynamic";
import {useGlobal} from '@/src/store/global/store';
import FormMesas from '@/src/components/mesas/FormMesas';

const TablesPage = () => {
    const modal = useGlobal(state => state.modal)
    const setModal = useGlobal(state => state.setModal)
    const Table = dynamic(() => import('../../../../src/components/mesas/TableMesas'), {
      ssr: false
    })

  return (
      <>
      <PageBreadcrumb title="Mesas" subName="Dashboard" />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase w-full flex justify-center items-center lg:w-auto'
              onClick={ () => setModal({status: true, element: <FormMesas />}) }
            >
              Agregar Mesa
            </button>

          {modal.status && modal.element}

          <section className="mt-5">
              <Table />
          </section>
      </>
  );
}

export default TablesPage