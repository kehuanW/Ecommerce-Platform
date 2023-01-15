import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    // padding: 20px;
    flex-wrap: wrap;
`

const Products = (props) => {
    const { category, searchContent, filters, sort } = props;
    // console.log("filters", filters);
    // console.log(category, filters, sort, searchContent);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // console.log("products", products);
    // console.log("filteredProducts", filteredProducts);

    const REACT_APP_CLIENT_DOMAIN = process.env.REACT_APP_CLIENT_DOMAIN
    useEffect(async () => {
        // console.log("category useEffect");
        let apiUrl;
        if (category) {
            apiUrl = `${REACT_APP_CLIENT_DOMAIN}products?category=${category}`;
        } else if (searchContent) {
            apiUrl = `${REACT_APP_CLIENT_DOMAIN}products?search=${searchContent}`;
        } else {
            apiUrl = `${REACT_APP_CLIENT_DOMAIN}products`;
        }
        try {
            const dbProducts = await axios.get(apiUrl);
            setProducts(dbProducts.data);
            // console.log("products in category useEffect", products);
            console.log("try")
        } catch (err) { };
    }, [category, searchContent]);

    useEffect(() => {
        // console.log("useEffect Filter");
        //TODO: deal with "any"
        if (category || searchContent) {

            // const propertyWithAny = Object.keys(filters).filter(key => filters[key] === "any");
            // console.log("propertyWithAny", propertyWithAny)
            let filtersTemp = filters;
            if (filtersTemp.size === "any") delete filtersTemp.size;
            if (filtersTemp.color === "any") delete filtersTemp.color;

            // console.log("filtersTemp", filtersTemp);
            filtersTemp &&
                setFilteredProducts(
                    products.filter((item) =>
                        Object.entries(filtersTemp).every(
                            ([key, value]) =>
                                item[key].includes(value)
                        )
                    )
                );
        }
    }, [products, category, searchContent, filters]);

    useEffect(() => {
        console.log("sort/product useEffect");
        if (sort === "asc") {
            // console.log("ASC useEffect products sort:", products.sort((a, b) => a.createdAt - b.createdAt))
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else if (sort === "desc") {
            // console.log("DESC useEffect products sort:", products.sort((a, b) => a.createdAt - b.createdAt))
            setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        } else if (sort === "any") {
            setFilteredProducts(((prev) => [...prev].sort((a, b) => a.title.localeCompare(b.title))));
        }
    }, [sort]);

    return (
        <Container>
            {console.log("FINAL RETURN")}
            {(sort || (filters && Object.keys(filters) !== 0))
                ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
                : products
                    .slice(0, 8)
                    .map((item) => <Product item={item} key={item._id} />)}
        </Container>
    )
}

export default Products