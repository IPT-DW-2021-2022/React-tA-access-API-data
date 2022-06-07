/**
 * App.js
 */

import React from "react";
import Table from './Table';

/**
 * read the animals'data from API
 */
async function getAnimals() {
  // read the animals'data from API
  let animalsData = await fetch("https://localhost:7046/api/AnimalsAPI/"); 

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




class App extends React.Component {
  state = {
    animals: []
  }

  /**
   * this function acts like a 'startup' when
   * the component is started
   */
  componentDidMount() {
    this.LoadAnimals();
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



  render() {
    const{animals}=this.state;

    return (
      <div className="container">
        <h1>Animals</h1>
        {/*  <h4>New animal:</h4>
           <Form />   */ }

        <br />
        <h4>Animals list</h4>
        <Table animalsDataIN={animals} />
      </div>
    )
  }
}
export default App;
