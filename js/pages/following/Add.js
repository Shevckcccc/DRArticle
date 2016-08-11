'use strict';

import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableHighlight, StyleSheet, RefreshControl } from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from 'react-native-navbar';
import Loading from '../../components/Loading';
import AuthorCell from '../../components/AuthorCell';
import HomeBanner from '../../components/HomeBanner';
import { getArticles } from '../../network';
import AppColors from '../../common/AppColors';
import FollowingDetail from './Detail.js';
import BackBarButton from '../../components/BackBarButton';
import CircleCheckBox from '../../components/CircleCheckBox';
import {navPop} from '../../actions/index';

class FollowingAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      refreshing: false,
      pageOffset: 0,
      pageLimit: 10,
    };

    this._toggleItemSelected = this._toggleItemSelected.bind(this);
    this._onRightButtonTapped = this._onRightButtonTapped.bind(this);
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(offset = 0) {
    offset *= this.state.pageLimit;
    getArticles({offset:offset, limit:this.state.pageLimit}, {
      onSuccess: (responseData) => {
        let authors = responseData.map((data, index) =>{
          return {
            ...data,
            isSelected: false,
          };
        });

        this.setState({
          authors: authors,
          dataSource: this.state.dataSource.cloneWithRows(authors),
          loaded: true,
          refreshing: false,
        });
      },
      onFailed: (err) => {
        this.setState({
          loaded: true,
          refreshing: false,
        });
      }
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._fetchData();
  }

  render() {
    let selectedCount = 0;
    for(var i = 0; i < this.state.authors.length; i++) {
      if(this.state.authors[i].isSelected) {
        selectedCount++;
      }
    }
    let navigationBar = (
      <NavigationBar
        title= {{title:this.props.title, tintColor: 'white'}}
        titleTextColor='white'
        statusBar={{style: 'light-content'}}
        tintColor={AppColors.major}
        leftButton={<BackBarButton onPress= {() => this._onLeftButtonTapped()} />}
        rightButton={{
          title: '订阅(' + selectedCount + ')',
          tintColor: selectedCount > 0 ? 'white' : 'grey',
          handler: () => {
            this._onRightButtonTapped(selectedCount);
          },
        }}
      />
    );

    if(!this.state.loaded) {
      return (
        <View>
          {navigationBar}
          <Loading/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {navigationBar}
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="gray"
              title="下拉刷新"
              titleColor="gray"
              colors={['blue', 'black', 'green']}
              progressBackgroundColor="yellow"
            />
          }
        />
      </View>
    );
  }

  _renderRow(rowData: object, sectionId: number, rowId: number) {
    return (
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <AuthorCell
          style={{flex: .7,}}
          onSelect={(author) => {
            this._toggleItemSelected(rowId);
          }}
          author={rowData}
        />
        <CircleCheckBox
          checked={rowData.isSelected}
          style={{flex: 0.3}}
          styleCheckboxContainer={{width: 30, height: 30}}
          outerSize={20}
          innerSize={18}
          onToggle={(checked) => {
            this._toggleItemSelected(rowId);
          }}
        />
      </View>
    );
  }

  _toggleItemSelected(rowId) {
    var newAuthors = this.state.authors.map((data, index) => {
      return {
        ...data,
        isSelected: index == rowId ? !data.isSelected : data.isSelected,
      }
    });
    this.setState({
      authors: newAuthors,
      dataSource: this.state.dataSource.cloneWithRows(newAuthors),
    });
  }

  _onLeftButtonTapped() {
    this.props.dispatch(navPop());
  }

  _onRightButtonTapped(selectedCount) {
    if(selectedCount > 0) {
      alert('选择了' + selectedCount + '个源');
    }
  }

}

var styles = StyleSheet.create({
  container: {
    flex:1,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },

  listView: {
     flex:1,
     marginTop: 0,
     backgroundColor: '#f5f5f5',
     marginBottom: 0,
  }
});

module.exports = connect((store) => ({}))(FollowingAdd)
