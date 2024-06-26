import React, { useState } from "react";
import "../styles/AddIssue.css";

function AddIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // проверка за празни полета
    const currentDate = new Date().toLocaleDateString();
    const newIssue = {
      title: title || "No title provided",
      description: description || "No description provided",
      priority: priority || "No priority was set",
      assignedTo: assignedTo || "Not assigned",
      deadline: deadline || "No deadline provided",
      creationDate: currentDate,
    };

    // запазване на issue в localStorage
    const issues = JSON.parse(localStorage.getItem("issues")) || [];
    issues.push(newIssue);
    localStorage.setItem("issues", JSON.stringify(issues));

    setTitle("");
    setDescription("");
    setPriority("");
    setAssignedTo("");
    setDeadline("");
  };

  return (
    <div className="add-issue-container">
      <h2>Add New Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select-field"
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Add Issue
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddIssue;