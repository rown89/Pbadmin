import React, { Component } from 'react';
import axios from 'axios';
import './AddProduct.css';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      puppy: false,
      cereal: false,
      weight: '',
      description: '',
      image: '',
      brands: [],
      brandID: 1,
      diets: [],
      dietID: 1,
      animals: [],
      animalID: 1,
      types: [],
      typeID: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.post('http://localhost:8080/adminize/animals',{
    })
    .then((response) => {
      this.setState({
        animals: response.data,
      })
    })
    .catch(err => console.log(err));

    axios.post('http://localhost:8080/adminize/brands',{
    })
    .then((response) => {
      this.setState({
        brands: response.data,
      })
    })
    .catch(err => console.log(err));

    axios.post('http://localhost:8080/adminize/diets',{
    })
    .then((response) => {
      this.setState({
        diets: response.data,
      })
    })
    .catch(err => console.log(err));

    axios.post('http://localhost:8080/adminize/types',{
    })
    .then((response) => {
      this.setState({
        types: response.data,
      })
    })
    .catch(err => console.log(err));
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
    axios.post('http://localhost:8080/adminize/addProducts',{
      name: this.state.name,  
      puppy: JSON.parse(this.state.puppy),
      cereal: JSON.parse(this.state.cereal),
      description: this.state.description,
      weight: this.state.weight,
      image: this.state.image,
      brandID: this.state.brandID,
      animalID: this.state.animalID,
      dietID: this.state.dietID,
      typeID: this.state.typeID,
    })
    .then((response) => {
      if(response.data.msg === 'products added'){
        alert(
          `name: '${this.state.name}',\n
          puppy: '${this.state.puppy}',\n
          cereal: '${this.state.cereal}',\n
          image link: '${this.state.image}',\n
          brandID: '${this.state.brandID}',\n
          animalID: '${this.state.animalID}',\n
          dietID: '${this.state.dietID}',\n
          typeID: '${this.state.typeID}',
          \n\n have been added`);
      }
    })
    .catch(err => console.log(err));
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
              <input placeholder='Product Name' type='text' name='name' value={this.state.name.value} onChange={this.handleChange} />
              <p>Is a Puppy Product?</p>
              <select name='puppy' value={this.state.puppy.value} onChange={this.handleChange}>
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
              <p>Is Cereal Free?</p>
              <select name='cereal' value={this.state.cereal.value} onChange={this.handleChange}>
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
              <input placeholder='Product Weight' type='text' name='weight' value={this.state.weight.value} onChange={this.handleChange} />
              <textarea placeholder='Product Description' name='description' value={this.state.description.value} onChange={this.handleChange} />
              <input placeholder='Product Image Link' type='text' name='image' value={this.state.image.value} onChange={this.handleChange} />
              <p>Brand</p>
              <select name='brandID' value={this.state.brandID.value} onChange={this.handleChange}>
                {this.state.brands.map((item) => 
                  <option value={item.brandid} key={item.brandid}>
                    {item.brandname}
                  </option>
                )}
              </select>
              <p>Animal</p>
              <select name='animalID' value={this.state.animalID.value} onChange={this.handleChange}>
                {this.state.animals.map((item) => 
                  <option value= {item.animalid} key={item.animalid}>
                    {item.animalname}
                  </option>
                )}
              </select>
              <p>Diet</p>
              <select name='dietID' value={this.state.dietID.value} onChange={this.handleChange}>
                {this.state.diets.map((item) => 
                  <option value= {item.dietid} key={item.dietid}>
                    {item.dietname}
                  </option>
                )}
              </select>
              <p>Type</p>
              <select name='typeID' value={this.state.typeID.value} onChange={this.handleChange}>
                {this.state.types.map((item) => 
                  <option value= {item.typeid} key={item.typeid}>
                    {item.typename}
                  </option>
                )}
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
