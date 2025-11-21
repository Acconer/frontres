/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useParams, useRouter } from 'next/navigation';
import '../style.css';
import { useEffect, useState } from 'react';
import { useOrder } from '@/src/store/order/store';
import { getOrderById } from '@/src/api/order';
import { FormatAmount, FormatDateTime } from '@/src/helpers/format';
import Image from 'next/image';

const TicketOrder = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useRouter();
    const order = useOrder((state) => state.order);
    const setOrder = useOrder((state) => state.setOrder);
  
  useEffect(() => {
    if(params.id){
         const getProduct = async () => {
            const response = await getOrderById(+params.id!);
            if (response.errors && response.errors.length > 0) {
                navigate.push("/dashboard/productos");
            } else {
                setOrder(response.order);
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
            Fecha Pedido: {FormatDateTime(order.date)}
            <br />
            <br />
            Mesero: {order.mesero}
            <br />
            Modo de Pago: {order.methodPayment ?? 'Pendiente'}
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
                {order.products.map((product, index: number) => (
                    <tr key={index} className="tr">
                        <td className="cantidad">{product.OrderProduct.quantity}</td>
                        <td className="producto">{product.name}</td>
                        <td className="precio">
                            {FormatAmount(product.price * product.OrderProduct.quantity)}
                        </td>
                    </tr>
                ))}

                <tr className="tr">
                    <td className="cantidad"></td>
                    <td className="producto">Total</td>
                    <td className="precio">{FormatAmount(order.total)}</td>
                </tr>
            </tbody>
        </table>
        <p className="centrado">
            ¡GRACIAS POR SU COMPRA!
            <br />
            ¡VUELVA PRONTO!
        </p>
    </div>

    <button
        className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded oculto-impresion"
        onClick={() => window.print()}>
        Imprimir
    </button>

    <button className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded oculto-impresion" onClick={() => navigate.back()}>
        Regresar
    </button>
</>
  )
}

export default TicketOrder
