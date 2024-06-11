import { Outlet, Link } from 'react-router-dom'

export function Inicio() {
    return (
        <div className='container'>
            <h1 className='text-center'>ETH eCommerce</h1>
            <div className='text-end'>
                <Link className='mx-2' to="/productos">Products</Link>
                <Link to="/cesta">Shopping cart</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}