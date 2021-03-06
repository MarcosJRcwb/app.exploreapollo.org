import React, {Component} from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {DayDisplay} from "../../components";

import {
  loadStories
} from "../../actions";

import {StoryList} from "../../components";
import Spinner from "react-spinner";

export class Apollo11Explorer extends Component {
  componentWillMount() {
    this.props.loadStories();
  }
  checkDay(){
    var mstart;
    var mend;
    const day = this.props.params.missionDay;
    const stories = _.sortBy(this.props.stories, "met_start");

    var targetstories = [];
    switch(day){
      case "1":
        mstart = 0;
        mend = 55680000;
        break;
      case "2":
        mstart = 55680001;
        mend = 142080000;
        break;
      case "3":
        mstart = 142080001;
        mend = 228479999;
        break;
      case "4":
        mstart = 228480000;
        mend = 314879998;
        break;
      case "5":
        mstart = 314879999;
        mend = 401279997;
        break;
      case "6":
        mstart = 401279998;
        mend = 487679996;
        break;
      case "7":
        mstart = 487679997;
        mend = 574079995;
        break;
      case "8":
        mstart = 574079996;
        mend = 660479994;
        break;
      case "9":
        mstart = 660479995;
        mend = 746879993;
        break;
      default:
        mstart = -746879993;
        mend = 746879993;
    }

    targetstories = _.filter(
      stories,function(story){
        return day == null || (story.met_start != null && ((story.met_start >= mstart && story.met_start <= mend) || (story.met_start < mstart && story.met_end > mstart)));
      }
    );

    if(_.isEmpty(targetstories)){
      return (
        <div>
          <div className="panel panel-default story-timeline-item story-item">
            <h3>&nbsp;No stories on this day</h3>
            <h3>&nbsp;</h3>
          </div>
          <p>&nbsp;</p>
        </div>
      );
    }else{
      return (
        <StoryList stories={targetstories}/>
      );
    }
  }
  render() {
    if (this.props.loading) {
      return (
        <div className="text-center lead">
          <p>Loading Stories...</p>
          <Spinner />
        </div>
      );
    }
    const url = `/apollo11/`;
    return (
      <div className="container">
        <DayDisplay day={this.props.params.missionDay} url={url}/>
        {this.checkDay()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {stories} = state;
  if (stories.loading) {
    return {
      loading: stories.loading
    };
  }
  return {
    loading: stories.loading,
    stories: stories.stories
  };
}

export default connect(mapStateToProps, {loadStories})(Apollo11Explorer);
