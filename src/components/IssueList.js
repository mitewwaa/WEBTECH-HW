import React, { useState, useEffect } from "react";
import "../styles/IssueList.css";

function IssueList() {
  const [filter, setFilter] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [assignees, setAssignees] = useState([]);

  // извличане на issues от localStorage
  useEffect(() => {
    const issuesFromLocalStorage =
      JSON.parse(localStorage.getItem("issues")) || [];
    setIssues(issuesFromLocalStorage);
    setFilteredIssues(issuesFromLocalStorage);

    // извличане на потребители от localStorage
    const uniqueAssignees = Array.from(
      new Set(issuesFromLocalStorage.map((issue) => issue.assignedTo))
    );
    setAssignees(uniqueAssignees);
  }, []);

  // филтриране на issues
  const filterIssues = () => {
    let filtered = issues.filter((issue) => {
      // подреждане по текстово съдържание
      const textMatch =
        issue.title.toLowerCase().includes(filter.toLowerCase()) ||
        issue.description.toLowerCase().includes(filter.toLowerCase());
      // подреждане по приоритет
      const priorityMatch =
        selectedPriority === "" ||
        issue.priority.toLowerCase() === selectedPriority.toLowerCase();
      // подреждане по asignee
      const assigneeMatch =
        selectedAssignee === "" ||
        issue.assignedTo.toLowerCase() === selectedAssignee.toLowerCase();
      // подреждане по избрана дата за краен срок
      const dateMatch = selectedDate === "" || issue.deadline === selectedDate;

      return textMatch && priorityMatch && assigneeMatch && dateMatch;
    });

    setFilteredIssues(filtered);
  };

  //филтриране на issues при избор на филтър 
  useEffect(() => {
    filterIssues();
  }, [filter, selectedPriority, selectedAssignee, selectedDate, issues]);

  return (
    <div className="issue-list">
      <h2>Issue List</h2>
      {/* въвеждане на текст */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        className="filter-input"
      />
      {/* избор на приоритет */}
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="priority-select"
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      {/* избор на asignee */}
      <select
        value={selectedAssignee}
        onChange={(e) => setSelectedAssignee(e.target.value)}
        className="assignee-select"
      >
        <option value="">All Assignees</option>
        {/* използване на зададените потребители за създаване на опциите в списъка */}
        {assignees.map((assignee, index) => (
          <option key={index} value={assignee}>
            {assignee}
          </option>
        ))}
      </select>
      {/* избор на дата */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-input"
      />
      <ul className="filtered-issues">
        {/* Показване на всички филтрирани issues */}
        {filteredIssues.map((issue, index) => (
          <li key={index} className="issue-item">
            <ul className="issues">
              <li className="issue-field">
                <span className="field-label">Title:</span>
                <span className="field-value">{issue.title}</span>
              </li>
              <li className="issue-field">
                <span className="field-label">Description:</span>
                <span className="field-value">{issue.description}</span>
              </li>
              <li className="issue-field">
                <span className="field-label">Priority:</span>
                <span className="field-value">{issue.priority}</span>
              </li>
              <li className="issue-field">
                <span className="field-label">Assigned To:</span>
                <span className="field-value">{issue.assignedTo}</span>
              </li>
              <li className="issue-field">
                <span className="field-label">Deadline:</span>
                <span className="field-value">{issue.deadline}</span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;