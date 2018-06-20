import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeAlert} from '../../actions/AlertAction'
import {FaClose} from 'react-icons/lib/fa'
import PropTypes from 'prop-types'

class Alert extends Component {

  removeAlert(id) {
    clearTimeout(this.state.autoCloseTimeout)
    let {removeAlert} = this.props
    removeAlert(id)
  }
  
  componentDidMount() {
    this.setState({
      autoCloseTimeout: setTimeout(()=> {
                            this.removeAlert(this.props.alert.id)
              }, this.props.autoCloseTime)
    })
  }

  render() {
    var {alert} = this.props;        
    return (
      <div className={'alert ' + alert.style } key={alert.id}>
        
          <div className='alert-text'>
            {alert.text}
          </div>
          <div className="settings-action" onClick={() => this.removeAlert(alert.id)}>
            <FaClose />
          </div>
        </div>
      
    );
  }
}

let mapStateToProps = (state) => ({
  autoCloseTime: state.AlertReducer.autoCloseTime
})

let mapDispathToProps = (dispatch) => ({
  removeAlert: (id) => dispatch(removeAlert(id))
})

Alert.propTypes = {
  alert: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispathToProps)(Alert);