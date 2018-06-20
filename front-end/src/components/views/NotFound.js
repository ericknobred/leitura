import React, { Component } from 'react'
import NavTop from '../nav/NavTop'

class NotFound extends Component {
    render() {
        return (
            <div>
                <NavTop />
                 <div className="app-container">
                    <div className="container">
                        <div className="app-box">
                        Sua página não foi encontrada!  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound