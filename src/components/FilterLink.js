import React from 'react';
import { setVisibilityFilter } from '../actions';
import { connect } from 'react-redux';

const FilterLink = ({
    active,
    children,
    onClick
}) => {
    if( active ){
        return <span>{children}</span>
    }
    return (
        <a href="https://google.com"
            onClick={ e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );   
}

const mapStateProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
});
const mapDispatchkProps = (dispatch, ownProps) => ({
    onClick(){ dispatch(setVisibilityFilter(ownProps.filter)) },
});

//the connect function creates a new component
export default connect( 
    mapStateProps,
    mapDispatchkProps
)(FilterLink);