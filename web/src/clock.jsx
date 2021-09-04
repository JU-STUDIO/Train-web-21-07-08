import React, { Component } from "react";
import axios from "axios";

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          date: new Date(),

          Date: "",
          Time: "",
          Clip_Id: "",
          E_Angle: "",
          E_Direct: "",
          E_Velo: "",
          KZone_Y: "",
          KZone_Z: "",
          Point: "",
          Velo_rel: "",
          Velo_end: "",
          V_Angle: "",
          H_Angle: "",

          baseballField: "",
          state: "",
          tempID: ""
    };
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    async tick() {

      this.setState({date: new Date()});

      const dataApiUrl = ("https://karmazone-4a7ed-default-rtdb.asia-southeast1.firebasedatabase.app/.json");
      const res = await axios.get(dataApiUrl);

      const baseballField = 'Tianmu';
      this.setState({baseballField:baseballField});

      // console.log(res.data['Tianmu'])
      if (res.data[baseballField]['Clip_Id'] !== this.state.tempID){
        
        if (res.data['Tianmu']['E_Angle'] == 0.0) {
          this.setState( {state: "未出棒"} );
        }else{
          this.setState( {state: "出棒"} );
        }

        console.log('Date: ',res.data[baseballField]['Date']);
        console.log('Time: ',res.data[baseballField]['Time']);
        console.log('Clip_Id: ',res.data[baseballField]['Clip_Id']);
        console.log('E_Angle: ',res.data[baseballField]['E_Angle']);
        console.log('E_Direct: ',res.data[baseballField]['E_Direct']);
        console.log('E_Velo: ',res.data[baseballField]['E_Velo']);
        console.log('KZone_Y: ',res.data[baseballField]['KZone_Y']);
        console.log('KZone_Z: ',res.data[baseballField]['KZone_Z']);
        console.log('Point: ',res.data[baseballField]['Point']);
        console.log('Velo-rel: ',res.data[baseballField]['Velo-rel'])
        console.log('Velo-end: ',res.data[baseballField]['Velo-end']);
        console.log('V_Angle: ',res.data[baseballField]['V_Angle']);
        console.log('H_Angle: ',res.data[baseballField]['H_Angle']);
        console.log('--------------------------');

        this.setState({tempID:res.data[baseballField]['Clip_Id']});

        this.setState({Date:res.data[baseballField]['Date']});
        this.setState({Time:res.data[baseballField]['Time']});
        this.setState({Clip_Id:res.data[baseballField]['Clip_Id']});
        this.setState({E_Angle:res.data[baseballField]['E_Angle']});
        this.setState({E_Direct:res.data[baseballField]['E_Direct']});
        this.setState({E_Velo:res.data[baseballField]['E_Velo']});
        this.setState({KZone_Y:res.data[baseballField]['KZone_Y']});
        this.setState({KZone_Z:res.data[baseballField]['KZone_Z']});
        this.setState({Point:res.data[baseballField]['Point']});
        this.setState({Velo_rel:res.data[baseballField]['Velo-rel']});
        this.setState({Velo_end:res.data[baseballField]['Velo-end']});
        this.setState({V_Angle:res.data[baseballField]['V_Angle']});
        this.setState({H_Angle:res.data[baseballField]['H_Angle']});

      }

    }
  
    render() {
      return (
        <div className="card">
          <h2 className="card-header text-center">{this.state.baseballField} RealTime Data</h2>
          {/* <ul className="card-body text-left">
              <li>資料日期: {this.state.Date}</li>
              <li>資料時間: {this.state.Time}</li>
              <li>資料序號: {this.state.Clip_Id}</li>
              <li>擊球仰角: {this.state.E_Angle}</li>
              <li>擊球方向: {this.state.E_Direct}</li>
              <li>擊球初速: {this.state.E_Velo}</li>
              <li>進壘點X: {this.state.KZone_Y}</li>
              <li>進壘點Y: {this.state.KZone_Z}</li>
              <li>Point: {this.state.Point}</li>
              <li>球速: {this.state.Velo_rel}</li>
              <li>尾速: {this.state.Velo_end}</li>
              <li>轉軸: system testing by LJY</li>
              <li>轉速: system testing by LJY</li>
              <li>H角度: {this.state.V_Angle}</li>
              <li>V角度: {this.state.H_Angle}</li>
              <li>出棒狀態: {this.state.state}</li>
          </ul> */}
          <table className="card-body table table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col">資料日期</th>
                <th scope="col">資料時間</th>
                <th scope="col">資料序號</th>
                <th scope="col">擊球仰角</th>
                <th scope="col">擊球方向</th>
                <th scope="col">擊球初速</th>
                <th scope="col">進壘點X</th>
                <th scope="col">進壘點Y</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{this.state.Date}</td>
                <td>{this.state.Time}</td>
                <td>{this.state.Clip_Id}</td>
                <td>{this.state.E_Angle}</td>
                <td>{this.state.E_Direct}</td>
                <td>{this.state.E_Velo}</td>
                <td>{this.state.KZone_Y}</td>
                <td>{this.state.KZone_Z}</td>
              </tr>
            </tbody>
          </table>

          <table className="card-body table table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col">Point</th>
                <th scope="col">球速</th>
                <th scope="col">尾速</th>
                <th scope="col">轉軸</th>
                <th scope="col">轉速</th>
                <th scope="col">H角度</th>
                <th scope="col">V角度</th>
                <th scope="col">出棒狀態</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{this.state.Point}</td>
                <td>{this.state.Velo_rel}</td>
                <td>{this.state.Velo_end}</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>{this.state.H_Angle}</td>
                <td>{this.state.V_Angle}</td>
                <td>{this.state.state}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="card-footer text-center mb-0">{this.state.date.toLocaleTimeString()}</h2>
        </div>
      );
    }
}

export default Clock;