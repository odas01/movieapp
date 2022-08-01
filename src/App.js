import 'antd/dist/antd.min.css';
import 'swiper/css';
import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import RoutesConfig from './config/RoutesConfig';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <RoutesConfig />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
