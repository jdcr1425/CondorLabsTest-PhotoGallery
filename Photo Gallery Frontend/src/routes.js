// Dependencies

import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Componenents

import App from './App';
import About from './components/about';
import Photos from './components/photos';
import Albums from './components/albums';
import Home from './components/home';
import Myphotos from './components/myphotos';
import View_profile from './components/view_profile';
import Myalbums from "./components/myalbums";
import View_album_photos from "./components/view_album_photos";

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/photos" component={Photos} />
            <Route exact path="/myphotos" component={Myphotos} />
            <Route exact path="/albums" component={Albums} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/myalbums" component={Myalbums} />
            <Route exact path="/view_profile/:id" component={View_profile} />
            <Route exact path="/view_photos_album/:id" component={View_album_photos} />
            <Route component={Home} />
        </Switch>
    </App>;


export default AppRoutes;
