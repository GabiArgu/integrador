import React from 'react'
import userDefault from "../../img/default-user.png"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {deleteAnuncios } from '../../actions/anuncios' 


const FeedItem = ({ 
  auth, 
  deleteAnuncios,
  anuncio: {_id, user, info,materia, name,avatar,date},
  showActions
}) => {

  const fechaDate = new Date(date)
  const fechaDateConv = fechaDate.toLocaleDateString()


  return (
    <div className="post bg-white p-1 my-1">      
    <div>
        <Link to={`/profile/${user}`}>
            <img
            className="round-img"               
            src={avatar ? avatar : userDefault}
            alt=""
            />
            <h4>{name} </h4>
            <p>{materia}</p>
        </Link>
    </div>

    <div>
        <p className="my-1">
            {info}
        </p>
        
        <p className="post-date">
            Creado el {fechaDateConv}
        </p>
        
        {
            showActions && 
            <>
                {
                    !auth.loading && user === auth.user._id && 
                    <button      
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => { deleteAnuncios(_id)}}
                    >   
                    borrar Anuncio❌
                    { /* <i className="fas fa-times"></i> */ } 
                    </button>
                }
            </>     
        }  
    </div>
</div>
  )
}

FeedItem.defaultProps = {
  showActions: true
}

FeedItem.propTypes = {
  anuncio: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAnuncios: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})


export default connect(mapStateToProps, {deleteAnuncios})( FeedItem)