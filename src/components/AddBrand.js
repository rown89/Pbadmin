import React, { Component } from 'react';
import './AddBrand.css';
import axios from 'axios';

class AddBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:8080/adminize/addBrand',{
      name: this.state.name,
      image: this.state.image
    })
    .then((response) => {
      console.log(response)
      if(response.data.msg === 'added'){
        alert(`name: '${this.state.name}',\nimage link: '${this.state.image}' \n\n have been added`);
      }
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='containerForm'>
          <div className='headerForm'>
          <p>Add Brands</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input placeholder="Brand Name" type='text' name='name' value={this.state.name.value} onChange={this.handleChange} />
              <input placeholder="Brand Image" type='text' name='image' value={this.state.image.value} onChange={this.handleChange} />
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}

export default AddBrand;
