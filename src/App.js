/**
 * App.js
 */

import React from "react";
import Table from './Table';
import Form from './Form';

/**
 * read the animals'data from API
 * To access data, is necessary to create a PROXY
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */
async function getAnimals() {
  // read the animals'data from API
  let animalsData = await fetch("api/AnimalsAPI/");

  // avaliate the data collected
  if (!animalsData.ok) {
    // ok, means HTTP code: 200
    console.error(animalsData);
    throw new Error("something went wrong when accessing animals'data. HTTP Code: ",
      animalsData.state);
  }

  // return the collected data, in JSON format
  return await animalsData.json();
}


/**
 * read the owners'data from API
 * To access data, is necessary to create a PROXY
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */
async function getOwners() {
  // read the onwers'data from API
  let ownersData = await fetch("api/ownersAPI/");

  // avaliate the data collected
  if (!ownersData.ok) {
    // ok, means HTTP code: 200
    console.error(ownersData);
    throw new Error("something went wrong when accessing owners'data. HTTP Code: ",
      ownersData.state);
  }
  // return the collected data, in JSON format
  return await ownersData.json();
}

/**
 * this function is the function that realy sends new animal data to API
 * @param {*} animal 
 */
async function AddAnimal(animal) {
  // to be done tomorow
}



class App extends React.Component {
  state = {
    animals: [],
    owners: [],
  }

  /**
   * this function acts like a 'startup' when
   * the component is started
   */
  componentDidMount() {
    this.LoadAnimals();
    this.LoadOwners();
  }

  /**
   * load the Animals' data, from API
   */
  async LoadAnimals() {
    try {
      // ask for data, from API
      let animalsFromAPI = await getAnimals();
      // after receiving data, store it at state
      this.setState({ animals: animalsFromAPI })
    } catch (ex) {
      console.error("Error: it was not possible to read animals' data", ex)
    }
  }

  /**
 * load the Owners' data, from API
 */
  async LoadOwners() {
    try {
      // ask for data, from API
      let ownersFromAPI = await getOwners();
      // after receiving data, store it at state
      this.setState({ owners: ownersFromAPI })
    } catch (ex) {
      console.error("Error: it was not possible to read owners' data", ex)
    }
  }

  /**
   * send the new animal data to API
   * @param {*} animal 
   */
  handleNewAnimalData = async (animal) => {
    /**
     * 1. read new animal data
     * 2. send it to API
     * 3. redraw the Table
     */

    // 1. already done. New animal data is send by parameter

    // 2.
    try {
      await AddAnimal(animal);
    } catch (error) {
      console.error("Something went wrong when a new animal was sento to API. ", error);
    }
    // 3.
    await this.LoadAnimals();
  }

  render() {
    const { animals, owners } = this.state;

    return (
      <div className="container">
        <h1>Animals</h1>
        <h4>New animal:</h4>
        <Form ownersIN={owners} newAnimalOUT={this.handleNewAnimalData} />

        <br />
        <h4>Animals list</h4>
        <Table animalsDataIN={animals} />
      </div>
    )
  }
}
export default App;
