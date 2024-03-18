import React from 'react'
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function SearchProducts({ data }) {
  return (
    <section class='products'>
            {
                data.map(product => {
                    const { title, img, rating, link } = product;
                    return (
                    <Link to={'/apibook?url='+link}>
                        <div className="product" >
                            <div className="img-container">
                                <img src={img} alt={title} />
                                <p className='rating'><FaStar /> {rating}</p>
                            </div>
                            <h4>{title}</h4>
                        </div>
                    </Link>
                    )
                })
            }
        </section>
  )
}

export default SearchProducts