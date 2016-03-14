import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRoutes from './../routes/routes.js';
import NavBar from './components/NavBar.js';

// class TestDiv extends Component {
//   render() {
//     return (
//       <div>
//         <ReactRoutes />
//       </div>
//     );
//   }
// }

ReactDOM.render(ReactRoutes, document.getElementById('app'));