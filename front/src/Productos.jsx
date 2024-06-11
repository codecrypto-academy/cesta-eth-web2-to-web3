import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export function Productos() {

    const { data, isLoading, error } = useQuery("prods", () => {
        return fetch("http://localhost:7777/productos").then(res => res.json())
    })

    if (isLoading) {
        return <div>Cargando productos...</div>
    }

    // if(error) {
    //     return <div>
    //         {JSON.stringify(error)} // La gestión del error no nos funcionaba y no merecía la pena investigarlo
    //     </div>
    // }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th className='text-end' scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(producto => (
                        <tr key={producto.ProductID}>
                            <td>
                                <Link to={`/productos/${producto.ProductID}`}>
                                    {producto.ProductName}
                                </Link>
                            </td>
                            <td className='text-end'>{producto.UnitPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {JSON.stringify(data)}  */}
        </div>
    )
}