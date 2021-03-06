import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';

import Category from '../components/category';
import Empty from '../components/empty';
import Separator from '../../sections/components/horizontal-separator';
import Layout from '../components/categories-list-layout';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

// const mapStateToProps = state => {
//   debugger;
// }

function mapStateToProps (state) {
  return {
    list: state.videos.categoryList
  }
}
class CategoryList extends Component {
  keyExtractor = item => item.id.toString();
  itemSeparator = () => <Separator />
  renderEmpty = () => <Empty text="No hay categorias :("/>
  viewCategory = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Category',
        params: {
          genre: item.genres
        }
      })
    )
  }
  renderItem = ({item}) => {
    return (
      <Category 
        onPress={() => {this.viewCategory(item)}}
        {...item}
      />
    )
  }
  render() {
    return (
      <Layout 
        title="Categorias"
      >
        <FlatList
            horizontal
            keyExtractor={this.keyExtractor}
            data={this.props.list}
            ListEmptyComponent = {this.renderEmpty}
            ItemSeparatorComponent = {this.itemSeparator}
            renderItem={this.renderItem}
          />
      </Layout>
    )
  }
}

export default connect(mapStateToProps)(CategoryList)