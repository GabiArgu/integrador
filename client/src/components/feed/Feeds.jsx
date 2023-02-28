import React from 'react'
import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { getAnuncios } from "../../actions/anuncios";
import Spinner from "../layout/Spinner";
import FeedForm from './FeedForm';
import FeedItem from './FeedItem';

const Feeds = ({getAnuncios, anuncio: {anuncios, loading}}) => {
  
  useEffect(() => {
        
    getAnuncios()
  
}, [getAnuncios])

  return (
    <>
    {
        loading ? <Spinner/> 
            : 
        <>
           <FeedForm/>

            {
                anuncios && anuncios.length > 0 ? 

                <div className="anuncios">

                    {
                        anuncios.map(item=>{
                            return <FeedItem key={item._id} anuncio={item} />
                        })
                    }

                </div>

                : 
                
                <p>aun no hay anuncios...💬</p>
            }
        </>
    }
    </>
  )
}

Feeds.propTypes = {
  getAnuncios: PropTypes.func.isRequired,
  anuncio: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  anuncio : state.anuncio,
})

export default connect(mapStateToProps, { getAnuncios })(Feeds); 