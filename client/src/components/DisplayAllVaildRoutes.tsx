import React from 'react'

function DisplayAllVaildRoutes() {
    const {Routes} = require('../context/routes.json');
    let result : JSX.Element[] = [];
    let asd : JSX.Element[] = [];
    (Routes as string[]).forEach(item => {
    
        asd.push(
            <td key={(Routes as string[]).indexOf(item)}>{item}</td>
        );
        if (asd.length === 4 || (Routes as string[]).indexOf(item) === (Routes as string[]).length-1) {
            result.push(
                <tr>{asd}</tr>
            )
            asd = [];
        }
    })
    
  return (
    <div className='row  col-sm-12  col-lg-8 d-flex flex-colum justify-content-between mx-auto'>
    <table className='table table-striped text-center '>
        <thead>
            <tr>
        <th colSpan={12} scope="row">
            All Valid Routes
            
        </th>
        </tr>
        </thead>
        <tbody>
        {result}
        </tbody>
        </table>
        </div>
  )
}

export default DisplayAllVaildRoutes