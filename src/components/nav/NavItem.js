import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class NavItem extends Component {
    render() {
        let { category, selected } = this.props
        return (
            <div><Link className={selected ? 'nav-item active' : 'nav-item'} to={category.path}>{category.name}</Link></div>
        )
    }
}

NavItem.propTypes = {
    category: PropTypes.object.isRequired,
    selected: PropTypes.bool
}

export default NavItem