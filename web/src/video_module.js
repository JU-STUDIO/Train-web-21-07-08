import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import axios from "axios";
import css from "../scss/video_module.scss";

class VideoModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            selectOptions: [],
            gameAllData:[],
            selected: "",
            value: ""
        };
        //
        this.selectedHandleChange = this.selectedHandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // load view on start
    componentDidMount() {
        this.getSelectOptions();
    }

    // Get Data
    async getGameAllData(teamType) {
        const dataApiUrl = ("/data");
        const res = await axios.post(dataApiUrl, { 'teamType': teamType });
        const data = res.data;
        this.setState({ gameAllData: data });
    }

    // Get Select Options
    async getSelectOptions() {
        const options = [
            { value: '0', label: 'Guest' },
            { value: '1', label: 'Home' }
        ]
        this.setState({ selectOptions: options });

        const dataApiUrl = ("https://karmazone-4a7ed-default-rtdb.asia-southeast1.firebasedatabase.app/.json")
        const res = await axios.get(dataApiUrl)
        console.log(res.data['Tainan']['Date'])
    }

    // select Handle Change
    async selectedHandleChange(e) {

        this.getGameAllData(e.label)

        if (e.label == 'Guest'){
            const selected = "此選項編號: " + e.value + " 您選擇的是: 客隊"
            this.setState({ selected: selected });
        }else{
            const selected = "此選項編號: " + e.value + " 您選擇的是: 主隊"
            this.setState({ selected: selected });
        }
    }

    async handleChange(e){

        console.log('handleChange:',e);
        console.log('input:', e.target.value);

        this.setState({selected: e.target.value});
        // this.setState({value: Number(e.target.value)+1});

    }

    async handleSubmit(){

        const value = this.state.selected;

        const dataApiUrl = ("/parameter");
        const res = await axios.post(dataApiUrl, { 'value': value });
        const data = res.data;

        this.setState({ gameAllData: data });

        alert('您送出的是： ' + this.state.selected);

    }

    render() {

        const {
            selectOptions,
            selected,
            gameAllData
        } = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-4">
                        <Clock ></Clock>
                            <Select
                            className="mb-2"
                                placeholder="選擇"
                                options={selectOptions}
                                onChange={this.selectedHandleChange}
                            />

                            <p className="text-center mb-2">{selected}</p>
                            
                            <form className="form-group" onSubmit={this.handleSubmit}>
                                <input type="text" className="form-control mb-2" defaultValue={this.state.value} onChange={this.handleChange} />
                                <input type="submit" value="送出" className="btn btn-primary form-control mb-2" />
                            </form>

                        </div>

                        <div className="col">
                            <table className="table table-striped">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">局數</th>
                                        <th scope="col">打者</th>
                                        <th scope="col">投手</th>
                                        <th scope="col">球種</th>
                                        <th scope="col">球速</th>
                                        <th scope="col">結果</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {gameAllData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.局數}</td>
                                            <td>{data.投手}</td>
                                            <td>{data.打者}</td>
                                            <td>{data.球種}</td>
                                            <td>{data.球速}</td>
                                            <td>{data.結果}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </React.Fragment >
        );
    }
}
// export default VideoModule;

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
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
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

if (document.getElementById("video_module")) {
    ReactDOM.render(<VideoModule />, document.getElementById("video_module"));
}