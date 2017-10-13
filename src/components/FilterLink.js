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
                className="filter_link"
                to={ filter === "all" ? "" : filter }
                isActive={isActiveFunc}
                activeClassName="filter_link--active"
            >
            <span className={`filter__label--${children.toLowerCase()}`}> {children} </span>
            </NavLink>
    );
}
export default FilterLink;