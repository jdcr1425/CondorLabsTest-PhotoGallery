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


export default class Albums extends Component {
    constructor(props){
        super(props);

        this.state = {

            show: false,
            form_incomplete:false,
            loading: false


        };
        this.save = this.save.bind(this);
        this.doAfterClosed = this.doAfterClosed.bind(this);
    }

    doAfterClosed(){
        console.log('closed');
    }


    async save (){

        if(document.getElementById('title').value === '' || document.getElementById('description').value === ''
            || document.getElementById('inputGroupFile01').files[0] === undefined
        ){
            this.setState({form_incomplete:true});
        }else{

            try{
                this.setState({loading: true});
                this.setState({form_incomplete:false})
                let data = new FormData();
                data.append("name", document.getElementById('title').value)
                data.append("description", document.getElementById('description').value)
                data.append("file", document.getElementById('inputGroupFile01').files[0])

                await axios.post('http://localhost:4000/api/albums', data).then( res =>{

                    document.getElementById('title').value = "";
                    document.getElementById('description').value ="";
                    document.getElementById('inputGroupFile01').files = null;
                    console.log('album uploaded');
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
        return (

            <div className="container mt-4 p-5">

                <div className="row">

                    <div className="col-md-4 offset-md-4">
                        <Alert show={this.state.form_incomplete}  onClose={this.doAfterClosed} variant={'danger'}>
                            Fill all the fields!
                        </Alert>
                        <Alert show={this.state.show} dismissible onClose={this.doAfterClosed} variant={'success'}>
                            Album created successfully!
                        </Alert>
                        <div className="card animated fadeIn">
                            <div className="card-header text-center">
                                <h5 className="card-title">Create an album</h5>
                            </div>
                            <div className="card-body">
                                <form action="" method="" encType="">
                                    <div className="form-group">
                                        <input type="text" id="title" name="title" className="form-control" placeholder="Album Name" autoFocus />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="description" id="description" className="form-control" placeholder="Album description" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1"><span className="text-primary">Select an image</span></label>
                                        <input type="file" className="form-control-file" id="inputGroupFile01" />
                                    </div>

                                    <button  type="button" title="Upload your photo" className="btn btn-primary btn-block" onClick={this.save} >Create album</button>

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


