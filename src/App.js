import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "./App.css"

import ButtonsOverlay from "./ButtonsOverlay";
import MainMap from './nasa_blue_marbel_waters_resized.jpg';
import { Button, Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Maps_data = require.context('./data_images', true);

const imageList = Maps_data.keys().map(image => Maps_data(image));

const yazilar = [{title: "Changes in chlorophyll concentrations", content: "In the ocean, high chlorophyll concentrations are concentrated in areas where tiny, plant-like organisms (phytoplankton) thrive. The highest chlorophyll concentrations are in cold polar waters or in places where ocean currents bring cold water to the surface, such as around the equator and along the shores of continents. It is not the cold water itself that stimulates the phytoplankton. Instead, the cool temperatures are often a sign that the water has welled up to the surface from deeper in the ocean, carrying nutrients that have built up over time. In polar waters, nutrients accumulate in surface waters during the dark winter months when plants can’t grow. When sunlight returns in the spring and summer, the plants flourish in high concentrations.\nMeasurements of global chlorophyll and vegetation are valuable to scientists because they provide insight into the carbon cycle. Scientists use ocean chlorophyll and vegetation measurements to determine the planet’s net primary productivity: how much carbon is being used by the plants to grow. Carbon cycles through the oceans, soil and rocks, plants on land and in the ocean, and atmosphere. The build up of carbon dioxide released into the atmosphere by burning fossil fuel is the primary cause of global warming. The global biosphere has been helping to offset some of the excess carbon dioxide people have been pumping into the atmosphere.", read_more:["https://earthobservatory.nasa.gov/world-of-change/Biosphere#:~:text=Ocean%20chlorophyll%20concentrations%20can%20change,are%20grazing%20in%20an%20area"]}, 
{title: "Particulate Organic Carbon (POC)", content: "This algorithm provides an estimate of the concentration of particulate organic carbon (POC) in milligrams per cubic meter (mg m-3). It calculates this estimate based on an empirical relationship that has been developed using measurements taken in the field of POC and the ratios of blue-to-green bands in remote sensing reflectance (Rrs).", read_more:["https://oceancolor.gsfc.nasa.gov/resources/atbd/poc/"]},
{title: "Ocean has fever!", content: "Gavin Schmidt, the director of NASA's Goddard Institute for Space Studies, explains that long-term trends of increasing heat and warmer sea surface temperatures worldwide are primarily due to human activities, specifically the substantial greenhouse gas emissions since the industrial era. While short-term factors like weather, wind patterns, and aerosols can influence sea surface temperatures regionally, their impact on the global long-term mean is minimal. Research indicates that up to 93% of the excess heat resulting from greenhouse gas emissions has been absorbed by the ocean, mainly near the surface, which has significant implications for global warming and sea-level rise. Therefore, understanding the rate and significance of oceanic heat uptake is a key research focus.", read_more:["https://www.nature.com/articles/s41558-020-0822-0",
"https://earthobservatory.nasa.gov/images/151743/the-ocean-has-a-fever"]},
{title: "Ocean has fever!", content: "Gavin Schmidt, the director of NASA's Goddard Institute for Space Studies, explains that long-term trends of increasing heat and warmer sea surface temperatures worldwide are primarily due to human activities, specifically the substantial greenhouse gas emissions since the industrial era. While short-term factors like weather, wind patterns, and aerosols can influence sea surface temperatures regionally, their impact on the global long-term mean is minimal. Research indicates that up to 93% of the excess heat resulting from greenhouse gas emissions has been absorbed by the ocean, mainly near the surface, which has significant implications for global warming and sea-level rise. Therefore, understanding the rate and significance of oceanic heat uptake is a key research focus.", read_more:["https://www.nature.com/articles/s41558-020-0822-0",
"https://earthobservatory.nasa.gov/images/151743/the-ocean-has-a-fever"]},
]

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

class OceanInfo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Phytoplanctons' life cycle</Accordion.Header>
        <Accordion.Body>
          Content
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          content 2
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </div>
      );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_mode: 0,
      open_page_ind: 0,
      map_ind: 0,
      current_date: 1,
      current_human: 0,
      play: false
    };
  }
  render() {
    /*const response = fetch('deneme_data.tif').then(r=>r.blob()).catch((err)=>console.error(err)).then(async (b)=>{
      let blob = await fs.openAsBlob("./deneme_data.tiff")
      const { imageData, metadata } = await fromBlob(blob);
      console.log(metadata)
    });*/
    document.title = "Corals";

    return (
      <div>
        <div className="tools" style={{display: "flex", flexDirection:"row"}}>
        <h1 style={{fontSize:'14pt', margin: "20px"}}>Corals</h1>
        
              <div id="menu_buttons" style={{margin: "10px"}}>
                  <Button variant={this.state.current_mode === 0 ? "dark" : "light"} id="menu1" onClick={()=>{
                      document.getElementById("menu2").classList.remove("clicked");
                      document.getElementById("menu1").classList.add("clicked");
                      this.setState({current_mode: 0, map_ind: 0})
                    }}>
                    Select ocean
                  </Button>
                  
                  <Button id="menu2" variant={this.state.current_mode === 1 ?  "dark" : "light"} onClick={()=>{
                      document.getElementById("menu1").classList.remove("clicked");
                      document.getElementById("menu2").classList.add("clicked");
                      this.setState({map_ind: 1, current_mode: 1})
                    }}>
                    Impact on global warming 
                  </Button>
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
                  {this.state.current_mode === 0 ? <ButtonsOverlay changeState={(inde)=>{this.setState({open_page_ind: inde})}} style={{}}></ButtonsOverlay> : <div/>}
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      
      </div>
        <div className="sidebar" style={{}}>
          <h1 style={{}}>{this.state.current_mode === 0 ? "Select an ocean to view information" : "Select map mode"}</h1>
          <div className="sidebar-contents">
          {this.state.current_mode === 0 ? <OceanInfo index={this.state.open_page_ind}></OceanInfo>:
            <div className="sidebar-contents">
              <div className="slidecontainer">
                <input type="range" min="1" max={human_names[this.state.current_human].dates.length} value={this.state.current_date} className="slider" id="myRange" onChange={(e)=>{this.setState({current_date: e.target.value})}} class="date-slider"/>
                {GetDateString(this.state.current_human, this.state.current_date)}
              </div>

              {human_names.map((human_name, index)=>{
                return (<Button variant={this.state.current_human !== index ? "light" : "dark"} className="map_button" key={index} onClick={()=>{this.setState({map_ind: index+1, current_human: index, current_date: 1})}}>{human_name.isim}</Button>);
              })}
              <div style={{wordWrap: "break-word"}}>
                <h1>{yazilar[this.state.current_human].title}</h1>
                <div>{yazilar[this.state.current_human].content}</div>
                <div>Further read: 
                  {yazilar[this.state.current_human].read_more.map(e=><div><a href={yazilar[this.state.current_human].read_more}>
                    {e}
                  </a><br/></div>)}
                </div>
              </div>
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