'use strict';

import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native';
import Swiper from 'react-native-swiper';
import AppColors from '../common/AppColors';
import DRImage from '../components/DRImage';

export default class HomeBanner extends Component {
    constructor(props) {  
    super(props);  
  }  

  render() {
    return (
      	<View style={styles.banner}>
           <Swiper 
            style={styles.wrapper} 
            autoplay={true}
            activeDot={<View style={styles.activeDot}/>}
            dot={<View style={styles.dot}/>}
            paginationStyle={styles.paginationStyle}
            height={180} >
              {this.props.banners.map((item, key) => {
                return this._renderPage(item, key);
              })}
            </Swiper>
      	</View>
    )
  }

  _renderPage(item, key) {  
    return (  
      <TouchableHighlight key={key}
        style={{flex:1}}
        onPress={() => this.props.onSelect(item)}
        underlayColor={AppColors.highlight}>
        <DRImage  
            source={{uri: item.titleImage}}  
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
  },

  paginationStyle:{
      bottom:10,
  },

  activeDot: {
    backgroundColor: 'white', 
    width: 4, 
    height: 4, 
    borderRadius: 2, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },

  dot:{
    backgroundColor: 'rgba(255,255,255,0.5)', 
    width: 4, 
    height: 4, 
    borderRadius: 2, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },

});