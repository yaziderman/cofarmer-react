import React, { Component } from 'react';
import ViewMoreText from 'react-native-view-more-text';
//Does not work yet for some installation issues.
let ReadMoreAndLess = React.createClass({
  renderViewMore(onPress){
    return(
      <span onPress={onPress}>View more</span>
    )
  },
  renderViewLess(onPress){
    return(
      <span onPress={onPress}>View less</span>
    )
  },
  render(){
    return(
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        textStyle={{textAlign: 'center'}}
      >
        <div>
          Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
        </div>
      </ViewMoreText>
    )
  }
})

export default ReadMoreAndLess;
