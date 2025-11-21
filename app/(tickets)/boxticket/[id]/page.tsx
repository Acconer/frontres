/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useParams, useRouter } from 'next/navigation';
import '../../ticket/style.css';
import { useEffect, useState } from 'react';
import { FormatAmount, FormatDateTime } from '@/src/helpers/format';
import { useBoxStore } from '@/src/store/box/store';
import { getBoxById } from '@/src/api/box';
import Image from 'next/image';

const TicketOrder = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useRouter();
    const boxItem = useBoxStore(state => state.boxItem);
    const setBoxItem = useBoxStore(state => state.setBoxItem);
  
  useEffect(() => {
    if(params.id){
         const getProduct = async () => {
            const response = await getBoxById(+params.id!);
            if (response.errors && response.errors.length > 0) {
                navigate.push("/dashboard/productos");
            } else {
                setBoxItem(response.box);
            }
            setLoading(false);
        };
        getProduct();
    }
  }, [params.id])

    if (loading) return <>Cargando...</>;

  return (
      <>
          <div className="ticket">
              <Image
                  src="/image.png"
                  alt="Logo"
                  className="logo"
                  width={100}
                  height={100}
              />

              <p className="centrado">
                  <br />
                  TU RESTAURANTE
                  <br />
                  Fecha Pedido: {FormatDateTime(boxItem.date)}
                  <br />
                  <br />
                  Encargado: {boxItem.name}
                  <br />
              </p>
              <table className="table">
                  <thead className="thead">
                      <tr className="tr">
                          <th className="cantidad">No.</th>
                          <th className="producto">Producto</th>
                          <th className="precio">$$</th>
                      </tr>
                  </thead>
                  <tbody>
                      {boxItem.related_products.map((product, index: number) => (
                          <tr key={index} className="tr">
                              <td className="cantidad">
                                  {product.BoxProduct.quantity}
                              </td>
                              <td className="producto">{product.name}</td>
                              <td className="precio">
                                  {FormatAmount(
                                      product.price * product.BoxProduct.quantity
                                  )}
                              </td>
                          </tr>
                      ))}

                      <tr className="tr">
                          <td className="cantidad"></td>
                          <td className="producto">Total</td>
                          <td className="precio">{FormatAmount(boxItem.total)}</td>
                      </tr>
                  </tbody>
              </table>
          </div>

          <button
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded oculto-impresion"
              onClick={() => window.print()}>
              Imprimir
          </button>

          <button
              className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded oculto-impresion"
              onClick={() => navigate.back()}>
              Regresar
          </button>
      </>
  );
}

export default TicketOrder
