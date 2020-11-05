import React, {Component} from 'react';
import ValidationError from './ValidationError'
import ApiContext from '../ApiContext'

class AddFolder extends Component {
    state={
        folder: {
        value: '',
        touched: false,
        
        }

    }

static contextType = ApiContext
    
updateFolder(folder) {
    this.setState({folder: {value: folder, touched: false}});
    console.log(this.state.folder.value);
}

validateName() {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return 'Name is required';
    }
  }
    render(){
        return (
            <form onSubmit={e => this.handleSubmit(e)} style={{color: "white"}} >
            <label>Add Folder:</label>
            <input type="text" placeholder="Enter Folder Name" onChange={e => this.updateFolder(e.target.value)}/>
            {this.state.folder.touched &&(
            <ValidationError message={this.validateName()}/>
            )}
            <button                
                type="submit"
                disabled={
                this.validateName()
                }>
                Save
            </button>

            
                
            </form>
        )

    }

    handleSubmit(event) {
        event.preventDefault();
        const {folder} = this.state
        console.log(folder.value)
        const folderObj = {'name':folder.value}
        const url = `http://localhost:8000/folders`
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folderObj)
        })
        .then(response => response.json())
        .then(folder =>{
           this.context.addFolder(folder)
           this.props.history.push(`/`)
        })
    }

}

export default AddFolder
