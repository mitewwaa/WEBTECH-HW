import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IssueList from './components/IssueList';
import AddIssue from './components/AddIssue';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-issue" element={<AddIssue />} />
            <Route path="/issues" element={<IssueList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;