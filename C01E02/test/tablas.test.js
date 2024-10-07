const assert = require('assert');
const chai = require('chai');
const request = require('supertest');
const app = require('../app')

describe('Test unitarios para la ruta `/` con tablas', function() {

    it('Respuesta del servidor', function() {
      return request(app)
        .get('/')
        .then((response) => {
            assert.equal(response.status, 200)
        })
    });

    let table1 = `
      <table>
        <caption>Datos de descarga por Sistema Operativo</caption>
        <tr>
          <th>Windows</th>
          <td>325</td>
        </tr>
        <tr>
          <th>MacOS</th>
          <td>102</td>
        </tr>
        <tr>
          <th>Linux</th>
          <td>50</td>
        </tr>
      </table>
    `

    let table2 = `
      <table border="1" align="center">
        <caption>Datos de descarga por Sistema Operativo y por Mes</caption>
        <tr>
          <th>Mes</th>
          <th>Enero</th>
          <th>Febrero</th>
          <th>Marzo</th>
        </tr>
        <tr>
          <th>Windows</th>
          <td>100</td>
          <td>25</td>
          <td>200</td>
        </tr>
        <tr>
          <th>MacOS</th>
          <td>30</td>
          <td>72</td>
          <td>0</td>
        </tr>
        <tr>
          <th>Linux</th>
          <td>15</td>
          <td>20</td>
          <td>15</td>
        </tr>
      </table>
    `

    it('En views/index.ejs use la etiqueta: '+table1, function() {
      return request(app)
        .get('/')
        .then((response) => {
            
            let responseclean = response.text.replace(/\s/g, '').replace(/(?:\r\n|\r|\n)/g, '')
            let table1clean = table1.replace(/\s/g, '').replace(/(?:\r\n|\r|\n)/g, '');

            chai.expect(responseclean).to.contain(table1clean);
            
        })
    });

    it('En views/index.ejs use la etiqueta: '+table2, function() {
      return request(app)
        .get('/')
        .then((response) => {
            
            let responseclean = response.text.replace(/\s/g, '').replace(/(?:\r\n|\r|\n)/g, '')
            let table2clean = table2.replace(/\s/g, '').replace(/(?:\r\n|\r|\n)/g, '');

            chai.expect(responseclean).to.contain(table2clean);
            
        })
    });

});