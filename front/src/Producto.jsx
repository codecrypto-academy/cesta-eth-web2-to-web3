import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import { Contexto } from './main'
import { set, useForm } from 'react-hook-form'

export function Producto() {
    const [estado, setEstado] = useContext(Contexto)

    const params = useParams()

    const { data, isLoading } = useQuery('producto', () => {
        return fetch(`http://localhost:7777/productos/${params.idProducto}`)
            .then(res => res.json())
    })

    const cantidad = estado.cesta.find(elemento => elemento.producto.ProductID === Number(params.idProducto))?.cantidad

    const { register, handleSubmit } = useForm(
        { defaultValues: { cantidad: cantidad } }
    );

    function alPulsar(datosBotón) {
        // console.log(estado.cesta)
        setEstado({
            ...estado,
            cesta: [...estado.cesta.filter(elemento => elemento.producto.ProductID !== data[0].ProductID),
            {
                producto: data[0],
                cantidad: datosBotón.cantidad,
                total: data[0].UnitPrice * datosBotón.cantidad
            }]
        })
    }

    if (isLoading) {
        return <div>Cargando producto...</div>
    }

    return (
        <div>
            <h3>Producto</h3>
            <table className='table w-50'>
                <tbody>
                    <tr>
                        <th scope="col">ID</th>
                        <td>{data[0].ProductID}</td>
                    </tr>
                    <tr>
                        <th scope="col">Name</th>
                        <td>{data[0].ProductName}</td>
                    </tr>
                    <tr>
                        <th scope="col">Price</th>
                        <td>{data[0].UnitPrice}</td>
                    </tr>
                </tbody>
            </table>
            <form onSubmit={handleSubmit(alPulsar)}>
                <div className="form-group">
                    <label>Introduzca cantidad</label>
                    <input {...register('cantidad')} type="number" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Añadir a la cesta</button>
            </form>
            {/* {JSON.stringify(estado.cesta)} */}
        </div>
    )
}