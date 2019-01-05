import React, { Component } from 'react';
import axios from 'axios';
import './AddProduct.css';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      brands: [], 
      puppy: false,
      cereal: false,
      weight: '',
      description: '',
      image: '',
      diets: [],
      animals: [],
      types: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.post('http://localhost:8080/adminize/animals',{
    })
    .then((response) => {
      const reMap = response.data.map(item => {
       const animals = {
         animalID: item.animalid,
         animalName: item.animalname,
       }
       return animals
      })
      this.setState({
        animals: reMap,
      })
    })
    .catch(err => console.log(err));

    axios.post('http://localhost:8080/adminize/brands',{
    })
    .then((response) => {
      const reMap = response.data.map(item => {
       const brand = {
         brandID: item.brandid,
         brandName: item.brandname,
       }
       return brand
      })
      this.setState({
        brands: reMap,
      })
    })
    .catch(err => console.log(err));

    axios.post('http://localhost:8080/adminize/diets',{
    })
    .then((response) => {
      const reMap = response.data.map(item => {
       const diets = {
         dietID: item.dietid,
         dietName: item.dietname,
        }
       return diets
      })
      this.setState({
        diets: reMap,
      })
    })
    .catch(err => console.log(err));

    axios.post('http://localhost:8080/adminize/types',{
    })
    .then((response) => {
      const reMap = response.data.map(item => {
       const types = {
        typeID: item.typeid,
        typeName: item.typename,
        }
       return types
      })
      this.setState({
        types: reMap,
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
    axios.post('http://localhost:8080/adminize/addProduct',{
      brands: this.state.brands,
      name: this.state.name,
      puppy: this.state.puppy,
      cereal: this.state.cereal,
      animals: this.state.animals,
      diets: this.state.diets,
      types: this.state.types,
      image: this.state.image
    })
    .then((response) => {
      console.log(response)
      if(response.data.msg === 'added'){
        alert(`name: '${this.state.name}',\nimage link: '${this.state.image}' \n\n have been added`);
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
              <input placeholder="Product Name" type='text' name='name' value={this.state.name.value} onChange={this.handleChange} />
              <p>Is a Puppy Product?</p>
              <select>
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
              <p>Is Cereal Free?</p>
              <select>
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
              <input placeholder="Product Weight" type='text' name='weight' value={this.state.weight.value} onChange={this.handleChange} />
              <textarea placeholder="Product Description" name='description' value={this.state.description.value} onChange={this.handleChange} />
              <input placeholder="Product Image Link" type='text' name='image' value={this.state.image.value} onChange={this.handleChange} />
              <p>Brand</p>
              <select>
                {this.state.brands.map((item) => 
                  <option value= {item.brandID} key={item.brandID}>
                    {item.brandName}
                  </option>
                )}
              </select>
              <p>Animal</p>
              <select>
                {this.state.animals.map((item) => 
                  <option value= {item.animalID} key={item.animalID}>
                    {item.animalName}
                  </option>
                )}
              </select>
              <p>Diet</p>
              <select>
                {this.state.diets.map((item) => 
                  <option value= {item.dietID} key={item.dietID}>
                    {item.dietName}
                  </option>
                )}
              </select>
              <p>Type</p>
              <select>
                {this.state.types.map((item) => 
                  <option value= {item.typeID} key={item.typeID}>
                    {item.typeName}
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
