import React, { Component } from 'react';
import './index.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import PhotoContainer from './Components/PhotoContainer';
import PageNotFound from './Components/PageNotFound';

class App extends Component {

  state = {
    photos: [],
    value: '',
    isLoaded: false
  }

  // removes photos with a duplicate 'owner' value from data response and returns the filtered array
  removeDuplicateOwnerPhotos = (data) => {
    const obj = {};
    let filteredArray = [];

    // set the 'obj' object's key to an owner property from passed 'data' array (object's take unique keys)
    // 'obj' object equals to corresponding photo object returned from 'data'
    for (let i in data) {
      obj[data[i].owner] = data[i];
    }

    // loop through 'obj' and push each object inside 'filteredArray'
    for (let i in obj) {
      filteredArray.push(obj[i]);
    }
    
    return filteredArray;
  }

  // takes in value of searched or clicked link
  // updates state value to user value and isLoaded to false
  // runs callback to fetch flickr data and change isLoaded to true
  getData = (value) => {
    if (value !== this.state.value) {
      this.setState( prevState => {
        return {
          value: prevState.value = value,
          isLoaded: prevState.isLoaded = false
        }
      }, () => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.state.value}&per_page=500&safe_search=1&format=json&nojsoncallback=1`)
        .then(response => { 
          this.setState( prevState => {
            return {
              photos: this.removeDuplicateOwnerPhotos(response.data.photos.photo),
              isLoaded: prevState.isLoaded = true
            }
          });
        })
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
          <div className="container">
              <SearchForm getData={this.getData} />
              <Navigation />
              <Switch>
                <Route exact path="/search/:tag" 
                  render={ () => 
                    <PhotoContainer 
                      data={this.state.photos}
                      value={this.state.value} 
                      isLoaded={this.state.isLoaded}
                      getData={this.getData}
                    /> } 
                  />
                <Route exact path="/:link" render={ () => 
                  <PhotoContainer 
                    data={this.state.photos}
                    value={this.state.value} 
                    isLoaded={this.state.isLoaded}
                    getData={this.getData}
                  /> } 
                />
                <Route exact path="/" render={ () => <Redirect exact to="/space" /> } />
                <Route render={ () => <PageNotFound /> } />
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;