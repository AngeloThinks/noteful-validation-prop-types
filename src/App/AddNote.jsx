import React, { Component } from "react";
import ValidationError from "./ValidationError";
import ApiContext from "../ApiContext";

class AddNote extends Component {
  state = {
    note: {
      title: "",
      touched: false,
    },
    folderId: {
      value: "",
    },
    content: {
      value: "",
    },
  };

  static contextType = ApiContext;

  updateNote(note) {
    this.setState({ note: { title: note, touched: true } });
    console.log(this.state.note.title);
  }

  updateContent(content) {
    this.setState({ content: { value: content } });
  }

  updateFolderId(id) {
    this.setState({ folderId: { value: id } });
  }

  validateName() {
    const note = this.state.note.title.trim();
    if (note.length === 0) {
      return "Text is required";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { note, folderId, content } = this.state;
    console.log(note.title);
    const noteObj = {
      title: note.title,
      content: content.value,
      folder_id: parseInt(folderId.value),
      
    };
    console.log(noteObj)
    const url = `http://localhost:8000/notes`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteObj),
    })
      .then((response) => response.json())
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/`);
      });
  }
  render() {
    const { folders } = this.context;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} style={{ color: "white" }}>
        <label>Note Title:</label>
        <input
          type="text"
          placeholder="Enter Note Name"
          onChange={(e) => this.updateNote(e.target.value)}
        />
        {this.state.note.touched && (
          <ValidationError message={this.validateName()} />
        )}
        <label>Description:</label>
        <input
          type="text"
          placeholder="Enter Description"
          onChange={(e) => this.updateContent(e.target.value)}
        />
        <label>Folders:</label>
        <select
          name="drop-down"
          id="drop-down"
          onChange={(e) => this.updateFolderId(e.target.value)}
        >
          <option>Must Select Folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={this.validateName()}>
          Add
        </button>
      </form>
    );
  }
}

export default AddNote;
