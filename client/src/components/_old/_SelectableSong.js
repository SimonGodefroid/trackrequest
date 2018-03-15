// http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=diplo&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json

import React, { Component } from "react";
import { Async } from "react-select";
import fetch from "isomorphic-fetch";
import "react-select/dist/react-select.css";

class SelectableSong extends Component {

  getOptions(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json`
    )
      .then(response =>response.json())
      .then(json => {
        console.log("json", json.results.trackmatches.track);
        const results = json.results.trackmatches.track.map(res=>({value:res.name, label:res.name}));
        return { options: results };
      });
  }

  render() {
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label} </h3>
        <Async 
          name="sourceTrack" 
          value="one" 
          loadOptions={this.getOptions} />
      </div>
    );
  }
}

export default SelectableSong;
