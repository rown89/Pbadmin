import React, { Component } from 'react';
import axios from 'axios';
import { css } from 'react-emotion';
import { BeatLoader } from 'react-spinners';
import MaterialTable from 'material-table'
import './Brands.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #bff5ee;
`;

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.post('http://localhost:8080/adminize/brands', {
    })
      .then((response) => {
        const dataMap = response.data.map(item => {
          const dataRemap = { brandid: item.brandid, brandname: item.brandname, brandimage: item.brandimage };
          return dataRemap
        })
        this.setState({
          loading: false,
          data: dataMap,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className='sweet-loading'>
          <BeatLoader
            className={override}
            sizeUnit={'px'}
            widthUnit={'px'}
            heightUnit={'px'}
            size={10}
            color={'#01CEA2'}
            loading={this.state.loading}
          />
        </div>
          <MaterialTable
            title= 'All Brands'
            data= {this.state.data}
            columns={[
              { title: 'Id', field: 'brandid' },
              { title: 'Brand', field: 'brandname' },
              { title: 'image', field: 'brandimage' },
            ]}
          />
      </div>
    )
  }
}

export default Brands;
