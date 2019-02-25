import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top p-3">
                <div className="container">
                    <a className="navbar-brand" href="/home">

                        <img src="https://image.flaticon.com/icons/png/512/806/806656.png" width="50" height="30" className="d-inline-block align-top mr-2" alt="logo error" />
                        Photo Gallery</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/home'} className="nav-link" >Home</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={'/photos'} id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Photos
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={'/photos'}>Add a photo</Link>
                                    <Link className="dropdown-item" to={'/myphotos'}>My photos</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={'/albums'} id="navbarDropdown" role="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Albums
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={'/albums'}>Add an album</Link>
                                    <Link className="dropdown-item" to={'/myalbums'}>My albums</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

