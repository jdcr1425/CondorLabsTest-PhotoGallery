import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Home extends Component {
    render() {
        return (

            <main className="index mx-auto animated fadeIn">
                <header className="masthead d-flex">
                    <div className="container text-center">
                        <h1 className="mb-1">Photo Gallery</h1>
                        <h3 className="mb-5">
                            <em>Store your favorite photos</em>
                        </h3>
                        <Link className="btn btn-outline-dark btn-lg" to="/photos">
                            Upload a photo
                        </Link>
                    </div>
                    <div className="overlay"></div>
                </header>
            </main>

        )

    }

}
