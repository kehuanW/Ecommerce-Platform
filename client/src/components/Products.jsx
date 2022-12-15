import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    // padding: 20px;
    flex-wrap: wrap;
`

const Products = (props) => {
    const { category, searchContent, filters, sort } = props;
    console.log(category, filters, sort, searchContent);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const dbProducts = await axios.get(
                    category
                        ? `http://localhost:5000/api/products?category=${category}`
                        : `http://localhost:5000/api/products`
                );
                setProducts(dbProducts.data);
                // console.log(dbProducts);
            } catch (err) { };
        };
        getProducts();
    }, [category]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const dbProducts = await axios.get(
                    searchContent
                        ? `http://localhost:5000/api/products?category=${searchContent}`
                        : `http://localhost:5000/api/products`
                );
                setProducts(dbProducts.data);
                // console.log(dbProducts);
            } catch (err) { };
        };
        getProducts();
    }, [searchContent]);

    useEffect(() => {
        console.log("products, category, filters");
        category &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [products, category, filters]);

    useEffect(() => {
        console.log("sort");
        if (sort === "newest") {
            setFilteredProducts(products.sort((a, b) => a.createdAt - b.createdAt));
        } else if (sort === "asc") {
            // setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
            setFilteredProducts(products.sort((a, b) => a.price - b.price));
        } else if (sort === "desc") {
            // setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
            setFilteredProducts(products.sort((a, b) => b.price - a.price));
        }
    }, [sort]);

    return (
        <Container>
            {category
                ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
                : products
                    .slice(0, 8)
                    .map((item) => <Product item={item} key={item._id} />)}
        </Container>
    )
}

export default Products