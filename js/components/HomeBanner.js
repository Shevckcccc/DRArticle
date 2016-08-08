'use strict';

import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native';
import ViewPager from 'react-native-viewpager';
import DefaultViewPageIndicator from 'react-native-viewpager/DefaultViewPageIndicator';
import AppColors from '../commons/AppColors';

export default class HomeBanner extends Component {
    constructor(props) {  
    super(props);  
    var dataSource = new ViewPager.DataSource({  
        pageHasChanged: (p1, p2) => p1 !== p2,  
    });    
    this.state = {  
        dataSource: dataSource.cloneWithPages(this.props.banners),
    }  
  }  

  render() {
    return (
      	<View style={styles.banner}>
      		<ViewPager  
  			    dataSource={this.state.dataSource}  
  			    renderPage={this._renderPage.bind(this)}  
  			    isLoop={true}  
            autoPlay={true}
            renderPageIndicator = {this._renderPageIndicator.bind(this)}/>
      	</View>
    )
  }

  _renderPage(data, pageID) {  
    return (  
      <TouchableHighlight 
        style={{flex:1}}
        onPress={() => this.props.onSelect(data)}
        underlayColor={AppColors.highlight}>
        <Image  
        	source={{uri: data.titleImage}}  
            style={{flex: 1, overflow: 'hidden'}}/>
      </TouchableHighlight>  
    );  
  }  

  _renderPageIndicator(props) {
    let data = this.props.banners[props.activePage];
  	return (<View style={styles.bannerIndicatorsContainer}>
              <Text style={styles.bannerIndicatorsText} numberOfLines={1}>
                  {data.title}
              </Text>
          		<View style={styles.bannerIndicators}>
                <DefaultViewPageIndicator {...props} />
              </View>
        	  </View>
    );
  }
}

var styles = StyleSheet.create({
  banner: {
    flex: 1,
    height: 180,
    backgroundColor: 'red',
  },

  bannerIndicatorsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height:20,
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  bannerIndicatorsText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 10,
    paddingTop: 3,
    width:230,
  },

  bannerIndicators: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 7,
    right: 0,
    backgroundColor: 'transparent',
  },

});