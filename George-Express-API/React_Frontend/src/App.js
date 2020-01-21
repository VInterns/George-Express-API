import React, { Component } from 'react';
import axios from 'axios';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip'



class App extends Component {
  constructor() {
    super();
    this.state = {
      Data: [],
    };
  }

  clickPost(e) {
    e.preventDefault();
    var url = 'http://localhost:3210/data';

    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    var hash = bcrypt.hashSync(this.inputpassword.value, saltRounds);

    axios.post(url, {
      name: this.inputname.value,
      age: this.inputage.value,
      password: hash
    })
      .then(function (response) {

        console.log(response.data);
        if (!response.data) {
          alert("Error user is already registered");
        } else {
          alert("User Registered successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.inputname.value = '';
    this.inputage.value = '';
    this.inputpassword.value = '';
  };

  clickGet(e) {
    e.preventDefault();
    var url = 'http://localhost:3210/data';
    axios.get(url)
      .then((retrieveData) => {
        console.log(retrieveData.data);
        this.setState({
          Data: retrieveData.data,
        })
      })
  };

  render() {
    const dataMongo = this.state.Data.map((item, index) => {
      var Array = ['Name: ', item.name, ', Age: ', item.age, ' th.', ', Password: ', item.password,].join(' ');
      return <p key={index}>{Array}</p>;
    })
    return (
      <div className="container">
        <Zoom>
          <center style={{ margin: '25px' }}>
            <Flip><h3>MERN</h3></Flip>

            <form>

              <div className="form-group" style={{ margin: '15px' }}>
                <input className="form-control" type="text" id="name"
                  ref={inname => this.inputname = inname}
                  placeholder="Enter name here!" />
              </div>

              <div className="form-group" style={{ margin: '15px' }}>
                <input className="form-control" type="number" id="age"
                  ref={inage => this.inputage = inage}
                  placeholder="Input age here!" />
              </div>

              <div className="form-group" style={{ margin: '15px' }}>
                <input className="form-control" type="password" id="password"
                  ref={inpass => this.inputpassword = inpass}
                  placeholder="Input password here!" />
              </div>

              <button className="btn btn-primary" style={{ width: '100px' }}
                onClick={this.clickPost.bind(this)}>POST</button>

              <button className="btn btn-success" style={{ margin: '15px', width: '100px' }}
                onClick={this.clickGet.bind(this)}>GET</button>

            </form>

            <div>
              {dataMongo}
            </div>
          </center>
        </Zoom>
      </div>
    );
  }
}

export default App;