import React, { Component } from 'react';
import axios from 'axios';
import { css } from 'react-emotion';
import { PulseLoader } from 'react-spinners';
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
      loading: true
    };
  }

  componentDidMount() {
    axios.post("http://62.75.141.240:9001/", {})
      .then((response) => {
        this.setState({
          loading: false,
          table: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='container'>
        <div className='loadingContainer'>
          <div className='sweet-loading'>
            {/*<PulseLoader
              className={override}
              sizeUnit={'px'}
              widthUnit={'px'}
              heightUnit={'px'}
              size={10}
              color={'#01CEA2'}
              loading={this.state.loading}
            />*/}
          </div>
          <MaterialTable
            columns={[
              { title: 'Adı', field: 'name' },
              { title: 'Soyadı', field: 'surname' },
              { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
              { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
            ]}
            data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
            title="All Products"
          />
        </div>
      </div>
    );
  }
}

export default Home;
