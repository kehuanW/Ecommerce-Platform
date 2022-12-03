import React from 'react'
import styled from 'styled-components'

import { categories } from '../data'
import CategoryItem from './CategoryItem'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
`

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => {
                return (
                    <CategoryItem item={item} key={item.id} />
                )
            })}
        </Container>
    )
}

export default Categories;