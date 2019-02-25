import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {confirmAlert} from "react-confirm-alert";
import request from "superagent";


export  default class View_album_photos extends Component {

    constructor(props){
        super(props);

        this.state = {
            photos:[],
            redirect: false
        }

        this.delete_album = this.delete_album.bind(this);
        this.delete_img = this.delete_img.bind(this);
        this.loadPhotos = this.loadPhotos.bind(this);
    }

    delete_img(id){
        
        confirmAlert({
            title: 'Image will be removed from this album',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        request
                            .patch(`http://localhost:4000/api/photos/${id}`)
                            .set('Accept', 'application/json')
                            .end((err, res)=>{
                               this.loadPhotos();
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })

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
                            .del(`http://localhost:4000/api/albums/${this.props.match.params.id}`)
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

    loadPhotos(){
        fetch(`http://localhost:4000/api/albums/${this.props.match.params.id}/photos`)
        .then((response) => {
            return response.json()
        })
        .then((recurso) => {
            console.log(recurso)
            this.setState({ photos: recurso })

        });
    }


    componentWillMount() {
       this.loadPhotos();
    }

    render() {
        const formatter = buildFormatter(englishStrings);

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/myalbums'/>;
        }

        if(this.state.photos){
            return (

                <div className="container p-4">
                    <div className="row justify-content-md-end text-right">
                        <div className="col-md-6 p-0"><nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link to='/home' className="breadcrumb-item">Home</Link>
                                <Link to='/myalbums' className="breadcrumb-item">Albums</Link>
                                <li className="breadcrumb-item active" aria-current="page">Data</li>
                            </ol>

                        </nav>
                        </div>
                        <div className="col-md-6 p-0"> <button onClick={this.delete_album} className="btn btn-danger mx-auto">Delete this album</button></div>

                    </div>

                    <div className="row">

                        <div className="card-columns mb-5">

                            {this.state.photos.map((photo,i) =>

                                <div className="card animated fadeIn" key={i}>
                                    <div className="card-header text-center">
                                        <strong>{photo.title}</strong>
                                    </div>
                                    <img src={photo.image_url} alt="" className="card-img-top"/>
                                    <div className="card-body">
                                        <p className="card-text">{photo.description}</p>
                                        <a href={photo.image_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">View</a>
                                        <button onClick={this.delete_img.bind(null,photo.id_img)} className="btn btn-danger btn-block">Delete</button>
                                    </div>
                                    <div className="card-footer text-muted text-center">
                                        <p className="card-text"><TimeAgo date={photo.created_at} formatter={formatter} /></p>
                                    </div>
                                </div>

                            )}

                        </div>


                    </div>
                </div>
            )
        }else{
            return (
                <div className='container text-center justify-content-center align-items-center'>
                    <p className="text-cemter">Cargando las fotos</p>
                </div>

            )
        }




    }

}
