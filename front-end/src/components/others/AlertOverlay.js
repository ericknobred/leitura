import React, { Component } from 'react';
import { connect } from 'react-redux'
import Alert from './Alert'

class AlertOverlay extends Component {

  render() {
    
    let {alerts} = this.props;

    return (
      <div className="alertOverlay">
        { alerts.map((alert) => (<Alert alert={alert} key={alert.id} />)) }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    alerts: state.AlertReducer.alerts,
  }
}

AlertOverlay.propTypes = {

}

export default connect(mapStateToProps)(AlertOverlay)