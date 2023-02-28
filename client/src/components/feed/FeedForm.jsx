import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAnuncios } from "../../actions/anuncios";

const FeedForm = ({ addAnuncios, auth: { user } }) => {
  let verificarRol = true;
  if (user.rol === "Alumno") {
    verificarRol = false;
    console.log(verificarRol);
  } else {
    console.log(verificarRol);
  }

  const [formData, setFormData] = useState({
    info: "",
    materia: "",
  });

  const { info, materia } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    addAnuncios({ info, materia });
  };
  return (
    <>
      {verificarRol !== "Alumno" ? (
        <div className="post-form">
          <h1>{user.rol}</h1>
          <div className="bg-primary p-1">
            <h3 className="text-center"> Crea tu anuncio </h3>
          </div>

          <form
            className="form my-1 centeredColumn"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <textarea
              name="info"
              cols="100"
              rows="5"
              placeholder="..."
              required
              value={info}
              onChange={(e) => handleChange(e)}
              /* style={{maxWidth : "200%"}} */
              style={{ width: "200%" }}
            ></textarea>
            <div className="my-1 centeredColumn">
              <select
                name="materia"
                value={materia}
                onChange={(e) => handleChange(e)}
              >
                <option value="0">Seleccione la Materia</option>
                <option value="Programacion">Programacion</option>
                <option value="Matematica">Matematica</option>
                <option value="Ingles">Ingles</option>
              </select>
            </div>

            <input type="submit" className="btn my-1" value="postear" />
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
FeedForm.propTypes = {
  addAnuncios: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addAnuncios })(FeedForm);