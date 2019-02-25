import React, { Component } from 'react';
import axios from 'axios';
import {Alert} from 'react-bootstrap'
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Photos extends Component {
    constructor(props){
        super(props);

        this.state = {

        show: false,
        albums:[],
            form_incomplete:false,
            loading: false


        };
        this.save = this.save.bind(this);
        this.doAfterClosed = this.doAfterClosed.bind(this);

    }

    doAfterClosed(){
        console.log('closed');
    }
    choose(album_name){
        //this.setState({nombre_down:'hola'})
        console.log(album_name);
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




    async save (){

        if(document.getElementById('title').value === '' || document.getElementById('description').value === ''
        || document.getElementById('inputGroupFile01').files[0] === undefined
        ){
            this.setState({form_incomplete:true});
        }else{
            try{
                this.setState({loading: true});


                this.setState({form_incomplete:false});

                let id_album = null;
                if(document.getElementById('id_album_full').value > 0){
                    id_album = document.getElementById('id_album_full').value;
                }

                let data = new FormData();
                data.append("title", document.getElementById('title').value)
                data.append("description", document.getElementById('description').value)
                if(id_album) data.append("id_album", id_album);
                data.append("file", document.getElementById('inputGroupFile01').files[0])

                await axios.post('http://localhost:4000/api/photos', data).then( res =>{

                    document.getElementById('title').value = "";
                    document.getElementById('description').value ="";
                    document.getElementById('inputGroupFile01').files = null;
                    console.log('img subida');
                    this.setState({loading: false});
                    this.setState({
                        show:true
                    });
                    setTimeout(() =>{
                        this.setState({
                            show: false
                        });
                    }, 4000);

                })

            }catch(error){
                console.log(error)
            }
        }

    }

    render() {

        console.log(this.state.albums)

        return (
            <div className="container mt-4 p-5">

            <div className="row">

                <div className="col-md-4 offset-md-4">
                    <Alert show={this.state.form_incomplete}  onClose={this.doAfterClosed} variant={'danger'}>
                        Fill all the fields!
                    </Alert>
                    <Alert show={this.state.show} dismissible onClose={this.doAfterClosed} variant={'success'}>
                        Image uploaded successfully!
                    </Alert>
                    <div className="card animated fadeIn">
                        <div className="card-header text-center">
                            <h5 className="card-title">Add a new photo</h5>
                        </div>
                        <div className="card-body">
                            <form action="http://localhost:4000/api/photos" method="POST" encType="multipart/form-data">
                                <div className="form-group">
                                    <input type="text" id="title" name="title" className="form-control" placeholder="Image Title" autoFocus />
                                </div>
                                <div className="form-group">
                                    <textarea name="description" id="description" className="form-control" placeholder="Image description" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1"><span className="text-primary">Select an image</span></label>
                                    <input type="file" className="form-control-file" id="inputGroupFile01" />
                                </div>
                                <label htmlFor="album"><span className="text-primary">Choose an album</span></label>
                                <select name="album" id="id_album_full" className="form-control  btn-block">
                                    {

                                        this.state.albums.map( (album, i) =>
                                            <option key={i} value={album.id_album}>{album.name}</option>
                                        )
                                    }


                                </select>
                                <button  type="button" title="Upload your photo" className="btn btn-primary btn-block" onClick={this.save} >Upload photo</button>

                            </form>

                        </div>

                    </div>

                    <br/>

                    <div className='sweet-loading'>
                        <PacmanLoader
                            css={override}
                            sizeUnit={"px"}
                            size={20}
                            color={'#428BCA'}
                            loading={this.state.loading}
                        />
                    </div>



                </div>


            </div>
            </div>
        )
    }
}
