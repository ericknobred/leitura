import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Icons from './Icons'

class ButtonActionBar extends Component {
    render() {
        return (
            <div className="post-item-actions"> 
                <Icons.FaPencil onClick={() => this.props.edit()} />
                <Icons.FaTrash onClick={() => this.props.openDialogDelete()} /> 
            </div>
        )
    }
}

ButtonActionBar.propTypes = {
    openDialogDelete: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
}

export default ButtonActionBar