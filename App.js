/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Home from './src/screens/containers/home';

import Header from './src/sections/components/header';
import CategoryList from './src/videos/containers/category-list';
import SuggestionList from './src/videos/containers/suggestion-list';

import API from './utils/api';
import Video from 'react-native-video';

type Props = {};
export default class App extends Component<Props> {

  state = {
    suggestionList: [],
    categoryList: []
  }
  async componentDidMount() {
    const movies = await API.getSuggestion(10);
    const categories = await API.getMovies();
    console.log(categories);
    this.setState({
      suggestionList: movies,
      categoryList: categories
    })
    
  }
  render() {
    return (
      <Home>
        <Header>
        </Header>
        <View
          style={{
            flex: 1,
            height: 100
          }}
        >
          <Video
            source={{uri: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'}}
            style={{
              position:'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
            resizeMode="contain"
            paused
          />
        </View>
        <Text>header</Text>
        <Text>Buscador</Text>
        <CategoryList list={this.state.categoryList}/>
        <SuggestionList list={this.state.suggestionList}/>
      </Home>
    );
  }
}
