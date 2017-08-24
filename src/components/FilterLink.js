import React from 'react'
import { NavLink } from 'react-router-dom';
const isActiveFunc = (match, location) => {
    let result = false;
    if( match !== null ){
        result = match.isExact
    }
    return result;
};
const FilterLink = ({ filter, children }) => {
    return (
        <NavLink
            to={ filter === "all" ? "" : filter }
            isActive={isActiveFunc}
            activeStyle={{
                textDecoration: 'none',
                color:'black'
                }}
        >
        {children}
        </NavLink>
    );
}
export default FilterLink;