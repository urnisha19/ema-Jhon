import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    document.title="Product Detail";
    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    // const [loading, setLoading] = useState(true);
    // const [product, setProduct] = useState({});
    // useEffect(() => {
    //     fetch('/product/' + productKey)
    //         .then(res => res.json())
    //         .then(data => {
    //             setProduct(data);
    //             setLoading(false);
    //         })
    // }, [productKey])

    return (
        <div>
            <h1>Your Product Details:</h1>
            <Product showAddToCart={false} product={product}></Product>
            {/* {
                loading ? <CircularProgress /> : <Product showAddToCart={false} product={product}></Product>
            } */}
        </div>
    );
};

export default ProductDetail;