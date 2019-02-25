import React, { Component } from 'react';

export class Navbar extends Component {
    render() {
        return (

            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <form action="">
                                <div className="form-group">
                                    <input type="text" name="title" className="form-control" placeholder="Image Title" />
                                </div>


                            </form>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}
