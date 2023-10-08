import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "./App.css"

import map from './nasa_blue_marbel_waters_resized.jpg';
import clorophyl from './deneme_data_aph_443.png';
import ButtonsOverlay from "./ButtonsOverlay";
import DataOverlay from "./DataOverlay";
import GeoTIFF, {fromBlob, fromFile} from 'geotiff';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';

import MainMap from './nasa_blue_marbel_waters_resized.jpg';

const Maps_data = require.context('./data_images', true);

const imageList = Maps_data.keys().map(image => Maps_data(image));

function imgListToMaps(list) {
  var gercek_isimler = []
  var human_names = []
  for(let i = 0; i < list.length; i++) {
    let gercek_isim = (list[i]+"").substring(2, list[i].length-8);
    let gercek_tarih = (list[i]+"").substring(list[i].length-8, list[i].length);
    let ind = gercek_isimler.indexOf(gercek_isim);
    if(ind === -1) {
      human_names.push({dates: [gercek_tarih], isim: gercek_isim, index: i});
      gercek_isimler.push(gercek_isim);
    }else {
      human_names[ind].dates.push(gercek_tarih);
    }
  }
  return human_names;
}

const human_names =  imgListToMaps(Maps_data.keys());

const Maps = imageList
console.log(Maps)

function get_current_map(human_ind, date_ind) {
  let humName = human_names[human_ind];
  console.log(human_ind, date_ind-1, human_names);
  return Maps[Maps_data.keys().indexOf("./"+humName.isim+humName.dates[date_ind-1])];
}

function GetDateString(human_ind, date_ind) {
  let humName = human_names[human_ind];
  let datePlusExt = humName.dates[date_ind-1];
  return datePlusExt.substring(0, datePlusExt.length-4);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_mode: 0,
      open_page_ind: 0,
      map_ind: 0,
      current_date: 1,
      current_human: 0
    };
  }
  render() {
    /*const response = fetch('deneme_data.tif').then(r=>r.blob()).catch((err)=>console.error(err)).then(async (b)=>{
      let blob = await fs.openAsBlob("./deneme_data.tiff")
      const { imageData, metadata } = await fromBlob(blob);
      console.log(metadata)
    });*/
    
    return (
      <div>
        <div className="tools" style={{display: "flex", flexDirection:"row"}}>
              <h1 style={{fontSize:'14pt', margin: "15px"}}>Learn Oceans!</h1>
              <div id="menu_buttons" style={{margin: "10px"}}>
                <button id="menu1" className={"menu-button" + (this.state.current_mode === 0 ? " clicked" : "")} onClick={()=>{
                    document.getElementById("menu2").classList.remove("clicked");
                    document.getElementById("menu1").classList.add("clicked");
                    this.setState({current_mode: 0, map_ind: 0})
                  }}>
                  Select ocean
                </button>
                
                <button id="menu2" className={"menu-button" + (this.state.current_mode === 1 ? " clicked" : "")} onClick={()=>{
                    document.getElementById("menu1").classList.remove("clicked");
                    document.getElementById("menu2").classList.add("clicked");
                    this.setState({map_ind: 1, current_mode: 1})
                  }}>
                  Impact on global warming 
                </button>
              </div>
            </div>
      <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{width:'75%', height:'100%'}}>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            
            <TransformComponent style={{height:'100%', width:'100%', alignItems: "center", backgroundColor: "red"}}>
                  <img src={this.state.current_mode === 0 ? MainMap : get_current_map(this.state.current_human, parseInt(this.state.current_date))} alt="test" style={{ height: '1000px', width:'100%'}}/>
                  {this.state.current_mode === 0 ? <ButtonsOverlay changeState={()=>{this.setState({open_page_ind: 1})}} style={{}}></ButtonsOverlay> : <div/>}
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      
      </div>
        <div className="sidebar" style={{}}>
          <h1 style={{}}>{this.state.current_mode === 0 ? "Select an ocean to view information" : "Select map mode"}</h1>
          <div className="sidebar-contents">
          {this.state.current_mode === 0 ? "bilgi":
            <div className="sidebar-contents">
              <div className="slidecontainer">
                <input type="range" min="1" max={human_names[this.state.current_human].dates.length} value={this.state.current_date} className="slider" id="myRange" onChange={(e)=>{this.setState({current_date: e.target.value})}}/>
                {GetDateString(this.state.current_human, this.state.current_date)}
              </div>

              {human_names.map((human_name, index)=>{
                return (<button className="map_button" key={index} onClick={()=>{this.setState({map_ind: index+1, current_human: index, current_date: 1})}}>{human_name.isim}</button>);
              })}
            </div>
          }
        </div>
        </div>
      </div>
      </div>
    );
    }
};

export default App;