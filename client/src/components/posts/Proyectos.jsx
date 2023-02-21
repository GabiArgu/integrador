import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProyectos,getProyecto } from "../../actions/proyectos";
import Spinner from "../layout/Spinner";

const Proyectos = ({ getProyectos,getProyecto, proyecto:{proyectos,proyectoId,loading}}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => { setShow(true)
  getProyecto(id)}
  //Funcion que me permite mostrar y cerrar el modal y ejecuta mi action para mostrar proyectos por id

  useEffect(() => {
    getProyectos();
  }, [getProyectos]);
  //Aqui luego de que se renderice el componente vamos a ejecutar getProyectos

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
        {/* <h2 className="text-center"> Formulario Proyectos </h2>
         <form>
                <label>
                  <input
                    type="Nombre"
                    placeholder="Nombre del Proyecto"
                    name="Nombre"
                  />
                </label>

                <label>
                  <input type="Año" placeholder="Año" name="Anio" />
                </label>
                <label>
                  <input
                    type="Lenguajes"
                    placeholder="Lenguajes Utilizados"
                    name="Lenguajes"
                  />
                </label>
                <label>
                  <input type="Empresa" placeholder="Empresa" name="Empresa" />
                </label>
                <label>
                  <input type="Usuario" placeholder="Usuario" name="Usuario" />
                </label>
              </form> */}
          <h2 className="text-center"> Proyectos </h2>

          {/* modal */}
          <Modal show={show}  animation={false}> 
            <Modal.Header>
              <Modal.Title>Mas Infomacion</Modal.Title>
            </Modal.Header> 
          {  proyectoId===null? (
             console.log("Valor nulo")
              )
              :
            
              (  <Modal.Body>
               
           
              <table className="table text-center">
                <thead>
              <tr>
                <th>Nombre</th>
                <th className="hide-sm" scope="col">
                  Año
                </th>
                <th className="hide-sm" scope="col">
                  Lenguajes
                </th>
                <th className="hide-sm" scope="col">
                  Empresas
                </th>
                <th className="hide-sm" scope="col">
                  Usuario
                </th>
                
              </tr>
            </thead>
                  <tbody>
                  <tr key={proyectoId._id} >
                 <td className="hide-sm" scope="col">
                   {proyectoId.Nombre}
                 </td>
                 <td className="hide-sm" scope="col">
                   {proyectoId.Anio}
                 </td>
                 <td className="hide-sm" scope="col">
                   <ul>
                     {proyectoId.Lenguajes.length > 0 && proyectoId.Lenguajes.map(lenguaje=><li>{lenguaje.nombre}</li>)}
                   </ul>
                 </td>
                 <td className="hide-sm" scope="col">
                   {proyectoId.Empresa}
                 </td>
                 <td className="hide-sm" scope="col">
                   {proyectoId.Usuario}
                 </td>
               </tr>
                  </tbody>
                </table>
             
                </Modal.Body>)
                }
              
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
       

          {/* tabla */}
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th className="hide-sm" scope="col">
                  Año
                </th>
                <th className="hide-sm" scope="col">
                  Usuario
                </th>
                <th scope="col">
                  <i className="fa-solid fa-gear ml-4"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {proyectos?.map(item=> {
                return(
                  <tr key={item._id}>
                  <td className="hide-sm" scope="col">
                    {item.Nombre}
                  </td>
                  <td className="hide-sm" scope="col">
                    {item.Anio}
                  </td>
                  <td className="hide-sm" scope="col">
                    {item.Usuario}
                  </td>
                  <td className="hide-sm" scope="col">
                    <button className="btn btn-dark" onClick={()=>{handleShow(item._id)}}>
                    <i className="fa-solid fa-address-book" ></i>
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

Proyectos.propTypes = {
  getProyectos: PropTypes.func.isRequired,
  getProyecto: PropTypes.func.isRequired,
  proyecto: PropTypes.object.isRequired,
};
//Estoy aplicando propTypes especificando que el action getProyectos y el object proyecto son requeridos y validando
//que los actios sean funciones y que proyecto sea un objeto


const mapStateToProps = (state) => ({
  proyecto: state.proyecto,
});
//Se necesita para extraer datos del store que necesitamos en el componente


export default connect(mapStateToProps, { getProyectos,getProyecto })(Proyectos);
//connet nos sirve para poder conectar nuestro componentes al store y asi poder usar propiedades del mismo
