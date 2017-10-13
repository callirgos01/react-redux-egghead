import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
    <fieldset className="filters">
        <legend className="filters__title"> Show: </legend>
        <FilterLink
            filter="/"
        >
            All
        </FilterLink>
        <FilterLink
            filter="/active"
        >
            Active
        </FilterLink>
        <FilterLink
            filter="/completed"
        >
            Completed
        </FilterLink>
    </fieldset> 
);

export default Footer;