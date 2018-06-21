import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../views/NotFound'
import EditPost from '../views/EditPost'
import DetailPost from '../views/DetailPost'
import EditComment from '../views/EditComment'
import Posts from '../views/Posts'

export default class Router extends Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route path="/PageNotFound" component={NotFound} />
                    <Route path="/:category/:postId" component={DetailPost} />
                    <Route path="/edit/:postId" component={EditPost} />
                    <Route path="/editComment/:commentId" component={EditComment} />
                    <Route path="/:category?" component={Posts} />                    
                </Switch>
            </div>
        )
    }
}