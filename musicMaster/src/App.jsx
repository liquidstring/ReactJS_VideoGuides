//This code works with the new spotify API
//It needs the node-spotify-api from npm to be installed
//npm install --save node-spotify-api in the console
//I think it can be done with only one spotify object, but for some reason when I try to do one object I end up getting the same result from both queries
//Thank You 15Dkatz for the code and instruction videos, you are amazing
import React, { Component } from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: 'c1d8d35701884f4abd064c38bc48d692',
  secret: '6f7466966a034b35afd06ddcdb6a8980'
});

var spotify2 = new Spotify({
  id: 'c1d8d35701884f4abd064c38bc48d692',
  secret: '6f7466966a034b35afd06ddcdb6a8980'
});

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      query:'',
      artist:null,
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL =' https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';


    // ----connection that works

        //console.log('FETCH_URL1', FETCH_URL);
        //console.log('this.state', this.state);
        spotify
          .request(`${FETCH_URL}`)
          .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});
            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
            //console.log('FETCH_URL2', URL2);

            spotify2
              .request(`${FETCH_URL}`)
              .then(json => {
                //console.log('artist\'s top tracks:', json);
                const { tracks } = json;
                this.setState({tracks});
              })
          })

            // -----

  }

  render() {
    return (
      <div className="App ">
        <div className="App-title">Music Master from App</div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search for an Artist"
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={ event => {
                  if (event.key === 'Enter')
                  {
                    this.search();

                  }
                }}
              >
              </FormControl>
              <InputGroup.Addon onClick={()=> this.search}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist = {this.state.artist}
            />
            <Gallery
              tracks={this.state.tracks}
            />
          </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
