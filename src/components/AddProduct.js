import React, { Component } from 'react';
import axios from 'axios';
import './AddProduct.css';

class AddProduct extends Component {
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
    axios.post('http://localhost:8080/adminize/addProduct',{
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
          <h1>Add Products</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input placeholder="Product Name" type='text' name='name' value={this.state.name.value} onChange={this.handleChange} />
              <p>Is a Puppy Product?</p>
              <select>
                <option value="f">False</option>
                <option value="t">True</option>
              </select>
              <p>Is Cereal Free?</p>
              <select>
                <option value="f">False</option>
                <option value="t">True</option>
              </select>
              <input placeholder="Product Weight" type='text' name='image' value={this.state.image.value} onChange={this.handleChange} />
              <input placeholder="Product Description" type='text' name='image' value={this.state.image.value} onChange={this.handleChange} />
              <input placeholder="Product Image" type='text' name='image' value={this.state.image.value} onChange={this.handleChange} />
              <p>Brand</p>
              <select>
                <option value="f">False</option>
                <option value="t">True</option>
              </select>
              <p>Animal</p>
              <select>
                <option value="f">False</option>
                <option value="t">True</option>
              </select>
              <p>Diet</p>
              <select>
                <option value="f">False</option>
                <option value="t">True</option>
              </select>
              <p>Type</p>
              <select>
                <option value="f">False</option>
                <option value="t">True</option>
              </select>
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}

export default AddProduct;
