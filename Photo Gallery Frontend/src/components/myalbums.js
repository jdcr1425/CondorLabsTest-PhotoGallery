import React, { Component } from 'react';
import {Link} from "react-router-dom";
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {confirmAlert} from "react-confirm-alert";
import request from "superagent";


export  default class Myalbums extends Component {

    constructor(props){
        super(props);

        this.state = {
            albums:[]
        }

        this.delete_album = this.delete_album.bind(this);
    }

    componentWillMount() {
        fetch('http://localhost:4000/api/albums')
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                console.log(recurso)
                this.setState({ albums: recurso })

            });
    }


    delete_album = (id) => {
        confirmAlert({
            title: 'Every image of this album will be deleted',
            message: 'Are you sure?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        request
                            .del(`http://localhost:4000/api/photos/${this.props.match.params.id}`)
                            .set('Accept', 'application/json')
                            .end((err, res)=>{
                                this.setState({ redirect: true });
                                console.log(res.body);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })
    };

    render() {
        const formatter = buildFormatter(englishStrings);
        if(this.state.albums.length > 0){
            return (
                <div className="container p-4">

                    <div className="row">

                        <div className="card-columns mb-5">

                            {this.state.albums.map((album,i) =>

                                <div className="card animated fadeIn" key={i}>
                                    <div className="card-header text-center">
                                        <strong>{album.name}</strong>
                                    </div>
                                    <img src={album.background_image_url} alt="" className="card-img-top"/>
                                    <div className="card-body">
                                        <p className="card-text">{album.description}</p>
                                        <Link to={'/view_photos_album/'+ album.id_album} className="btn btn-primary btn-block">View photos</Link>
                                    </div>
                                    <div className="card-footer text-muted text-center">
                                        <p className="card-text"><TimeAgo date={album.created_at} formatter={formatter} /></p>
                                    </div>
                                </div>

                            )}

                        </div>


                    </div>
                </div>
            )
        }else{
            return (
                <div className='container text-center '>
                    <div className="row">


                        <div className="col">
                            <p><strong>there is no albums</strong></p>
                        </div>




                        </div>

                </div>
            )
        }




    }

}
