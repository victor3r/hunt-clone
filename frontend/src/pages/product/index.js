import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Product(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const { id } = props.match.params;


    api.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
      });
  }, [props.match.params]);

  return (
    <div className="product-info">
      <h1>{product.title}</h1>
      <p>{product.description}</p>

      <p>
        URL: <a href={product.url} target="blank">{product.url}</a>
      </p>
    </div>
  );
}