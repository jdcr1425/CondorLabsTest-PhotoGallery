import React, { Component } from 'react';
import {Link} from "react-router-dom";
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import axios from 'axios';

export  default class Myphotos extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            photos:[],
            moveToAlbum: true,
            //selected: []
            
        }

    }

    search = () => {
        try{
            let name = document.getElementById('name').value;
            let startDate = document.getElementById('startDate').value;
            let endDate = document.getElementById('endDate').value;

            axios.get('http://localhost:4000/api/photos', {
                params: { title: name, startDate, endDate}
            }).then(result =>{
                this.setState({ photos: result.data })
            })

        }catch(err){

        }
        
    }

    /*moveToAlbumHandle = () =>{
        this.setState({ moveToAlbum: true });
    }

    addToAlbum = (id) =>{
        const { selected } = this.state;
        if(selected.filter(sel => +sel === +id).length === 0){
            this.setState({ selected: [...selected, +id ] })
            console.log(selected);
        } else {
            this.setState({ selected: selected.filter(sel => +sel !== +id )})
            console.log(selected);
        }
    }

    verifyExist = (id) => {
        const { selected } = this.state;
        return selected.filter(sel => +sel === +id).length === 0;
    }

   assingPhotosToAlbum = async () => {
        try {
            const id = 18888; //get By element
            const { selected } = this.state;
           await axios.post(`http://localhost:4000/albums/${id}/photos`, { photosIds: selected });
    
        }catch(err){}
        
    }
*/

    componentWillMount() {
        fetch('http://localhost:4000/api/photos')
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                console.log(recurso)
                this.setState({ photos: recurso })

            });
    }

    render() {
        const formatter = buildFormatter(englishStrings);
        

        if(this.state.photos.length > 0){
            return (
                <div className="container p-4">

                    <div className="row mb-3">
                    <div className="col p-0">
                        <p>
                    <button className="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Apply filters
                    </button>
                    </p>
                    <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                      <div className="form-row">
                        <div className="col-4">
                          <span>Start date</span>
                          <input type="date" className="form-control " id="startDate" />
                        </div>

                        <div className="col-4">
                        <span>End date</span>
                          <input type="date" className="form-control" id="endDate" />
                        </div>

                        <div className="col-4">
                        <span>Name</span>
                          <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="col mt-3">
                          <button onClick={this.search} className="btn btn-primary">Search</button>
                        </div>
                      </div>


                     </div>
                    </div>
                    </div>
                    </div>



                    <div className="row">

                        <div className="card-columns mb-5">

                            {this.state.photos.map((photo,i) =>

                                <div className="card animated fadeIn" key={i}>

                                {/*{this.state.moveToAlbum &&
                                     <button onClick={this.addToAlbum.bind(null,photo.id_img)}>
                                        {this.verifyExist(photo.id_img)? 'select' : 'unselect' }
                                     </button>
                                }*/}

                                    <div className="card-header text-center">
                                        <strong>{photo.title}</strong>
                                    </div>
                                    <img src={photo.image_url} alt="" className="card-img-top"/>
                                    <div className="card-body">
                                        <p className="card-text">{photo.description}</p>
                                        <Link to={'/view_profile/'+ photo.id_img} className="btn btn-primary btn-block">Details</Link>
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
                <p className="text-center">Cargando las fotos</p>
            )
        }




    }

}
