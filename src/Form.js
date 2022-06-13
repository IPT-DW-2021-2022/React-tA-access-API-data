/**
 * Form.js
 */

import React from "react";

/**
 * this component will create a 'dropdown' with owners' data
 */
const ChooseOwner = (props) => {
    const options = props.ownersDataIN.map((row) => {
        return <option value={row.id}>{row.name}</option>
    })
    return (
        <select className="form-select"
            onChange={props.choosedOwnerOUT} >
            <option value="">Choose an owner, please</option>
            {options}
        </select>
    )
}





class Form extends React.Component {
    newAnimal = {
        animalName: "",
        animalSpecie: "",
        animalBreed: "",
        animalWeight: "",
        animalPhoto: null,
        animalOwnerFK: "",
    }

    state = this.newAnimal;

    /**
     * function to handle data provided by 'input' field
     * @param {*} event 
     */
    handleAdd = (event) => {
        // read the data available at 'event'
        const { name, value } = event.target
        // assign to the state identified by 'name' withe the 'value' writed by user
        this.setState({
            [name]: value,
        })
    }

    /**
     * read the selected owner
     * @param {*} event 
     */
    handleOwnerChange = (event) => {
        this.setState({ animalOwnerFK: event.target.value });
    }

    /**
     * add the photo file to state
     */
    handlePhotoChange = (event) => {
        this.setState({ animalPhoto: event.target.files[0] })
    }

    /**
     * Sends data collect by the Form to API
     * @param {*} event 
     */
    handleForm = (event) => {
        // this statement will prevent Form to submit do Server the data
        event.preventDefault();

        // specefy an objet to transport data to API
        let formData = {
            Name: this.state.animalName,
            Specie: this.state.animalSpecie,
            Breed: this.state.animalBreed,
            Weight: this.state.animalWeight,
            uploadPhoto: this.state.animalPhoto,
            OwnerFK: this.state.animalOwnerFK,
        }
        // export data to <App />
        this.props.newAnimalOUT(formData);

    }



    render() {
        // read the state and props values
        const { animalName, animalWeight, animalSpecie, animalBreed } = this.state;
        const { ownersIN } = this.props;

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="row">
                    <div className="col-md-4">
                        Name: <input type="text"
                            required
                            className="form-control"
                            name="animalName"
                            value={animalName}
                            onChange={this.handleAdd}
                        /><br />
                        Weight: <input type="text"
                            required
                            className="form-control"
                            name="animalWeight"
                            value={animalWeight}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        Specie: <input type="text"
                            required
                            className="form-control"
                            name="animalSpecie"
                            value={animalSpecie}
                            onChange={this.handleAdd}
                        /><br />
                        Breed: <input type="text"
                            required
                            className="form-control"
                            name="animalBreed"
                            value={animalBreed}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        Photo: <input type="file"
                            required
                            name="animalPhoto"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handlePhotoChange}
                        /><br />
                        {/* o componente 'EscolheDono' irá ter dois parâmetros:
                            - dadosDonos: serve para introduzir no componente a lista dos donos a representar na dropdown
                            - idDonoEscolhido: serve para retirar do componente, o ID do dono que o utilizador escolheu,
                          que será entregue ao 'handlerDonoChange' */}
                        Owner: <ChooseOwner ownersDataIN={ownersIN}
                            choosedOwnerOUT={this.handleOwnerChange} />                         <br />
                    </div>
                </div>
                <input type="submit"
                    value="Add new animal"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Form;