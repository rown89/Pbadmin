import React, { Component } from 'react';
import axios from 'axios';
import { css } from 'react-emotion';
import { BeatLoader } from 'react-spinners';
import MaterialTable from 'material-table'
import './Home.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #bff5ee;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.post('http://localhost:8080/adminize/all', {
    })
      .then((response) => {
        const dataMap = response.data.map(item => {
          const dataRemap = { brandid: item.brandid, productid: item.productid, brandname: item.brandname, productname: item.productname, productdiet: item.dietname, producttype: item.typename, productanimal: item.animalname, brandimage: item.brandimage, productimage: item.productimage };
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
      <div className='container'>
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
            title="All Products"
            data={this.state.data}
            columns={[
              { title: 'Brand ID', field: 'brandid' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Product ID', field: 'productid' },
              { title: 'Product', field: 'productname' },
              { title: 'Diet', field: 'productdiet' },
              { title: 'Food Type', field: 'producttype' },
              { title: 'Animal', field: 'productanimal' },
              { title: 'Brand Image', field: 'brandimage' },
              { title: 'Product Image', field: 'productimage' },
            ]}
          />
      </div>
    );
  }
}

export default Home;
