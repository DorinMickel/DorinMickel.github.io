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
    if(localStorage.localTenants){
      tenantsData = JSON.parse(localStorage.localTenants)
    }
    else {
      tenantsData = tenantsAccounts
    }

    this.state = {
      allMembers: membersData,
      allTenants: tenantsData,
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
  addNewTenant = (newTenant) => {
    const localtenants = JSON.stringify(this.state.allTenants.concat(newTenant))
    localStorage.localTenants = localtenants;
    this.setState({
      allTenants: this.state.allTenants.concat(newTenant)
    })
  }

  deleteTenant = (deletedTenant) => {  
    const clearedTenants = this.state.allTenants.filter((item, index) => {
      return (index != deletedTenant)
    })
    localStorage.localTenants = JSON.stringify(clearedTenants)
    this.setState({
      allTenants: clearedTenants
    })
  }

  filterTenants = (filterInputText) => {
    console.log(filterInputText)
    const filteredTenantsList = this.state.allTenants.filter(input => {
        return (input.name.includes(filterInputText))
    })
    if(filterInputText != ''){
        this.setState({
            allTenants: filteredTenantsList
        })
    } else {
        this.setState({
            allTenants: JSON.parse(localStorage.localTenants)
        })
    }
  }
  logout = () => {
    this.setState({
      activeMember: null
    })
  }

  login = (tenantObj) => {
    this.setState({
      activeMember: tenantObj
    })
  }

  render(){
    
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
          allTenants={this.state.allTenants}
          login={this.login}
          />
        </Route>
        <Route exact path={["/member-dashboard", "/tenants"]}>
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
          allTenants={this.state.allTenants}
          addNewTenant={this.addNewTenant}
          deleteTenant={this.deleteTenant}
          filterTenants={this.filterTenants}
          /> 
        </Route>
        
      </HashRouter>
    );
  }
}

export default App;
