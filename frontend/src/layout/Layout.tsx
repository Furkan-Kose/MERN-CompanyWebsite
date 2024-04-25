import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className='min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-500 to-blue-100'> 
            <ScrollRestoration />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

export default Layout;