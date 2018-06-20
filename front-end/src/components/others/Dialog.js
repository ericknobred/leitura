import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideDialog } from '../../actions/DialogAction'

class Dialog extends Component {

    dispatchAction (dialog) {
        this.props.dispatchAction(dialog.action, dialog.payload)
    }

    cancelDialog() {
        this.props.hide()
    }

    render(){
        let {dialog} = this.props
        return (
            dialog.showDialog && (
                <div className="dialogOverlay">
                    <div className="dialogContainer">
                        <div className="dialog">
                            <h1><b>{dialog.title}</b></h1>
                            {dialog.text}
                            <div className="dialog-buttons">
                                <button className="dialog-ok" onClick={() => this.dispatchAction(dialog)}>{dialog.buttonOkText}</button>
                                <button className="dialog-cancel" onClick={() => this.cancelDialog()}>{dialog.buttonCancelText}</button>
                            </div>
                        </div> 
                    </div> 
                </div>
            )
        )   
    }
}

let mapStateToProps = state => {
    return {
        dialog: state.DialogReducer
    }
}

let mapDispatchToProps = dispatch => {
    return {
        dispatchAction: (action, payload) => {
            dispatch(action(payload)); 
            dispatch(hideDialog())
        },
        hide: () => dispatch(hideDialog())
    }
}

Dialog.propTypes = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(Dialog)