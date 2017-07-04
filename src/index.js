import ReactDOM from 'react-dom';
import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

const mainRoutes = makeMainRoutes();

ReactDOM.render(
    mainRoutes,
    document.getElementById('root')
);
