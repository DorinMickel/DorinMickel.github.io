import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import committeeMembersAccounts from './data/committeeMembersAccounts.json'
import MemberDashboard from './pages/MemberDashboard';
import MemberNavbar from './components/MemberNavbar';
import Tenants from './pages/Tenants';
import tenantsAccounts from './data/tenantsAccounts.json'


class App extends React.Component {
  constructor(props){
    super(props);

    let membersData=[];
    if(localStorage.localMembers){
      membersData = JSON.parse(localStorage.localMembers)
    }
    else {
      membersData = committeeMembersAccounts
    }

    let tenantsData=[];
    if(localStorage.localtenants){
      tenantsData = JSON.parse(localStorage.localtenants)
    }
    else {
      tenantsData = tenantsAccounts
    }

    this.state = {
      allMembers: membersData,
      allTanents: tenantsData,
      activeMember: null,
      
    }
  }
  addMember = (newMember) => {
    const localMemberString = JSON.stringify(this.state.allMembers.concat(newMember))
    localStorage.localMembers = localMemberString
    this.setState({
      allMembers: this.state.allMembers.concat(newMember),
      activeMember: newMember
    })
  }
  // logout = () => {
  //   this.setState({
  //     activeMember: null
  //   })
  // }

  login = (memberObj) => {
    this.setState({
      activeMember: memberObj
    })
  }

  render(){
    
    console.log(window.location)
    console.log(localStorage.localMembers)
    return (
      <HashRouter>
        <Route exact path="/">
          <Homepage></Homepage>
        </Route>
        <Route exact path="/signup">
          <Signup 
          addMember={this.addMember}
          allMembers={this.state.allMembers}
          />
        </Route>
        <Route exact path="/login">
          <Login 
          allMembers={this.state.allMembers}
          login={this.login}
          />
        </Route>
        <Route exact path={["/member-dashboard"]}>
          <MemberNavbar
          
          />
        </Route>
        <Route exact path="/member-dashboard">
          <MemberDashboard
          activeMember={this.state.activeMember}
          />
        </Route>
        <Route exact path="/tenants">
          <Tenants 
          allTanents={this.state.allTanents}
          /> 
        </Route>
        
      </HashRouter>
    );
  }
}

export default App;
