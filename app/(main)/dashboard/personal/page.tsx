'use client'
import dynamic from 'next/dynamic'
import PageBreadcrumb from '@/src/components/Global/PageBreadcrumb'
import FormPersonal from '@/src/components/personal/FormPersonal'
import { useGlobal } from '@/src/store/global/store'

const Table = dynamic(() => import('../../../../src/components/personal/TablePersonal'), {
  loading: () => <p>Loading...</p>,
})

const PersonalPage = () => {
  const modal = useGlobal(state => state.modal)
  const setModal = useGlobal(state => state.setModal)

  return (
    <>
      <PageBreadcrumb title="Personal" subName="Dashboard" />
      <button onClick={() => setModal({ status: true, element: <FormPersonal /> })} className="btn bg-primary text-white uppercase font-bold w-full md:w-auto">
        Agregar personal
      </button>

      { modal.status && modal.element }
      
      <section className='mt-6'>
        <Table />
      </section>
      
    </>
  )
}

export default PersonalPage
