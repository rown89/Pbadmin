import React, { Component } from 'react';
import axios from 'axios';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import './Brands.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

class AddBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    axios.post('http://localhost:8080/adminize/addBrand',  {
     })
      .then((response) => {
        const dataMap = response.data.map((item, id) => {
          const data = {  }
          return data
        })
        this.setState({
          loading: false,
          data: dataMap,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className='materialTable'>
          <BeatLoader
            className={override}
            sizeUnit={"px"}
            size={10}
            color={'#123abc'}
            loading={this.state.loading}
          />
          
        </div>
      </div>
    )
  }
}

export default AddBrand;
