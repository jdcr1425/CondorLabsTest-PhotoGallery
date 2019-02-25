import React, { Component } from 'react';
import request from 'superagent';
import {Link, Redirect} from "react-router-dom";
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


export default class View_profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            photo: {},
            redirect: false
        }

        this.delete_img = this.delete_img.bind(this);

    }

    delete_img = () => {
        confirmAlert({
            title: 'Image will be deleted',
            message: 'Are you sure to do this?.',
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


    componentWillMount() {

        request
            .get(`http://localhost:4000/api/photos/${this.props.match.params.id}`)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState({ photo: res.body})

            });
    }


    render() {
        const formatter = buildFormatter(englishStrings);
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/myphotos'/>;
        }
        if(this.state.photo){
            console.log(this.state.photo);
            return (

                <div className="container p-4">
                    <div className="row">
                        <div className="col-md-3 offset-md-3">
                                <div className="card animated fadeIn">
                                    <img src={this.state.photo.image_url} alt="" className="card-img-top"/>

                                </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card-body p-0">
                                <h5 className="card-title">{this.state.photo.title}</h5>
                                <p className="card-text">{this.state.photo.description}</p>
                                <p className="card-text">{this.state.photo.dimentions + ' px'}</p>
                                <p className="card-text">{this.state.photo.size + ' KB'}</p>
                                <p className="card-text"><TimeAgo date={this.state.photo.created_at} formatter={formatter} /></p>
                                <button  onClick={this.delete_img} className="btn btn-danger btn-block">Delete Image</button>
                                <Link to='/myphotos' className="btn btn-primary btn-block">Back</Link>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }else{
            return (
                <p>Cargando imagen</p>
            )
        }





    }

}
