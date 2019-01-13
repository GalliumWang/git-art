import React, { Component } from "react";
import {GitWallContext} from '../AppContext/GitWallContext';

//CSS
import './css/GitContribution.css';

class GitContributionComponentMain extends Component {

  componentDidMount(){
    console.log(this.context);
  }

  render() {

    return (
      <section className="section">
          <div className="box">

            {this.context.gitWall.walls.map(
              (wallRow)=>{
                return(
                  <div key={wallRow[0].date.format()+"-rowHeader" }className="columns">
                    {
                      wallRow.map(
                        (wallCol)=>{
                          return(
                            <GitContributionComponentWallBox 
                              key={wallCol.date.format()+"-col"}
                              wallObject={wallCol}
                            />
                          )
                        }
                      )
                    }

                  </div>
                );
              }
            )}
          </div>
      </section>
    );
  }
}

class GitContributionComponentWallBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      contentHeight:0,
      onHover:false,
      tooltipY:0,
      tooltipX:0,
    };
  }
  componentDidMount(){
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    //console.log(`Component size h: ${height}, w: ${width}`);
    this.setState({
      contentHeight:width,
    });
  }
  render() {
    let tooltipStyle = {};
    if(this.state.onHover){
      tooltipStyle={
        top: `${this.state.tooltipY-45}px`,
        left:`${this.state.tooltipX - 400}px,`,
        zIndex: 1
      }
    }

    return (
      <div className="column column-custom-padding">
        <div 
          className ="has-background-grey-lighter wall"   
          ref={ (divElement) => this.divElement = divElement}
          style={{height:this.state.contentHeight}}
          onMouseEnter = {(e)=>{
            console.log(this.props.wallObject);
            console.log(`x: ${e.screenX}, y: ${e.screenY}`);
            this.setState({
              onHover:true,
              tooltipY:e.clientY,
              tooltipX:e.clientX,
            })
          }}
          onMouseMove = {
            (e)=>{
              this.setState({
                tooltipY:e.clientY,
                tooltipX:e.clientX,
              })
            }
          }
          onMouseLeave = {
            ()=>{
              this.setState({
                onHover:false,
                tooltipY:0,
                tooltipX:0,
              });
            }
          }
        >
          <div className="tooltip" hidden={!this.state.onHover} 
          style={tooltipStyle}>
            Contributions on {this.props.wallObject.date.format('MMM D, YYYY')}
          </div>
        </div>
        
      </div>
    );
  }
}

GitContributionComponentMain.contextType = GitWallContext;

export default GitContributionComponentMain;
