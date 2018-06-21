import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavItem from './NavItem'
import { getAllCategories } from '../../actions/CategoryAction'

class NavTop extends Component {

    componentDidMount(){
        this.props.getAllCategories()
    }
    

    render() {

        let {categories, selected} = this.props
        return (
            this.props.loaded && (
                <div className="nav-container">
                    <div className='nav-top'>
                        <div className='container'>
                        <div className="nav-title">
                            Read
                        </div>
                        </div>
                    </div>
                    <div className="nav-menu">
                        <div className="container">
                        <div className="nav-items">
                            <NavItem selected={!selected} category={{path:'',name:'home'}} />
                            { categories.map(category => <NavItem key={category.name} selected={category.name === selected} category={category} />)}
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
        loaded: state.CategoryReducer.loaded,
        categories: state.CategoryReducer.categories
    }
}

 
var mapDispatchToProps = dispatch => bindActionCreators({
    getAllCategories: (a) => getAllCategories(a)
}, dispatch)

NavTop.propTypes = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTop)