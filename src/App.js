import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import communityAccounts from './data/communityAccounts.json'
import Dashboard from './pages/Dashboard';
import MainNavbar from './components/MainNavbar';
import Tenants from './pages/Tenants';
import tenantsAccounts from './data/tenantsAccounts.json'
import Messages from './pages/Messages';
import savedMessages from './data/savedMessages.json'
import Issues from './pages/Issues';
import savedIssues from './data/savedIssues.json'
import Voting from './pages/Voting';



class App extends React.Component {
  constructor(props){
    super(props);

    let communityData=[];
    if(localStorage.localCommunities){
      communityData = JSON.parse(localStorage.localCommunities)
    }
    else {
      communityData = communityAccounts
    }

    let tenantsData=[];
    if(localStorage.localTenants){
      tenantsData = JSON.parse(localStorage.localTenants)
    }
    else {
      tenantsData = tenantsAccounts
    }

    let messagesData=[];
    if(localStorage.localMesagges){
      messagesData = JSON.parse(localStorage.localMesagges)
    }
    else {
      messagesData = savedMessages
    }

    let issuesData = [];
    if(localStorage.localIssues){
  
      issuesData = JSON.parse(localStorage.localIssues)
    }
    else {
      issuesData = savedIssues
    }

    this.state = {
      allCommunities: communityData,
      allTenants: tenantsData,
      allMessages: messagesData,
      allIssues: issuesData,
      activeUser: {
        userId: 1,
        communityName: "BlaBla",
        name: "Dorin Mickel",
        email: "test@test.com",
        pwd: 123,
        apt: 2,
        isCommitteeMember: true},
    }
  }
  addCommunity = (newCommunity,newMember) => {
    const localCommunitiestring = JSON.stringify(this.state.allCommunities.concat(newCommunity))
    localStorage.localCommunities = localCommunitiestring
    this.setState({
      allCommunities: this.state.allCommunities.concat(newCommunity),
      activeUser: newMember
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
      return (index !== deletedTenant)
    })
    localStorage.localTenants = JSON.stringify(clearedTenants)
    this.setState({
      allTenants: clearedTenants
    })
  }

  removeIssue = (deletedItem) => {
    const clearedItems = this.state.allIssues.filter((item, index) => {
      return (index !== deletedItem)
    })
    localStorage.localIssues = JSON.stringify(clearedItems)
    this.setState({
      allIssues: clearedItems
    })
  }

  removeMessage = (deletedItem) => {
    const clearedItems = this.state.allMessages.filter((item, index) => {
      return (index !== deletedItem)
    })
    localStorage.localMesagges = JSON.stringify(clearedItems)
    this.setState({
      allMessages: clearedItems
    })
  }

  createNewMessage = (newMessageObj) => {
    const localMesagges = JSON.stringify(this.state.allMessages.concat(newMessageObj))
    localStorage.localMesagges = localMesagges;
    this.setState({
      allMessages: this.state.allMessages.concat(newMessageObj)
    })

  }

  reportNewIssue = (issueObj) => {
    const localIssuesString = JSON.stringify(this.state.allIssues.concat(issueObj));
    localStorage.localIssues = localIssuesString;
    this.setState({
      allIssues: this.state.allIssues.concat(issueObj)
    })
    console.log(this.state.allIssues)
  }

  addIssueComment = (comment, index) => {
    this.state.allIssues[index].comments = comment
    this.setState({
      allIssues: this.state.allIssues
    })
    localStorage.localIssues = JSON.stringify(this.state.allIssues)
  }

  addMessageComment = (comment, index) => {
    this.state.allMessages[index].comments = comment
    this.setState({
      allMessages: this.state.allMessages
    })
    localStorage.localMessages = JSON.stringify(this.state.allMessages)
  }

  updateIssueItem = (Issue) => {
    const IssueToUpdate = this.state.allIssues[Issue.index]
    IssueToUpdate.title = Issue.title
    IssueToUpdate.details = Issue.details
    IssueToUpdate.priority = Issue.priority
    IssueToUpdate.imgSrc = Issue.imgSrc

    this.setState({
      allIssues: this.state.allIssues
    })
    localStorage.localIssues = JSON.stringify(this.state.allIssues)
  } 

  updateMessageItem = (message) => {
    const MessageToUpdate = this.state.allMessages[message.index]
    MessageToUpdate.title = message.title
    MessageToUpdate.details = message.details
    MessageToUpdate.priority = message.priority
    MessageToUpdate.imgSrc = message.imgSrc

    this.setState({
      allMessages: this.state.allMessages
    })
    localStorage.localMessages = JSON.stringify(this.state.allMessages)
  }

  editTenantDetails = (updatedTenantObj, index) => {
    const tenantToUpdate = this.state.allTenants[index]
    tenantToUpdate.name = updatedTenantObj.name
    tenantToUpdate.email = updatedTenantObj.email
    tenantToUpdate.pwd = updatedTenantObj.pwd
    tenantToUpdate.apt = updatedTenantObj.apt

    this.setState({
      allTenants: this.state.allTenants
    })
    localStorage.localTenants = JSON.stringify(this.state.allTenants)
    
  }

  logout = () => {
    this.setState({
      activeUser: null
    })
  }

  login = (tenantObj) => {
    this.setState({
      activeUser: tenantObj
    })
  }

  render(){
    return (
      <React.Fragment>
        <Route exact path="/">
          <Homepage></Homepage>
        </Route>
        <Route exact path="/signup">
          <Signup 
          addCommunity={this.addCommunity}
          addNewTenant={this.addNewTenant}
          allTenants={this.state.allTenants}
          allCommunities={this.state.allCommunities}
          />
        </Route>
        <Route exact path="/login">
          <Login 
          allTenants={this.state.allTenants}
          login={this.login}
          />
        </Route>
        <Route exact path={["/dashboard", "/tenants", "/messages", "/issues", "/voting"]}>
        <MainNavbar
        activeUser={this.state.activeUser}/>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard 
            activeUser={this.state.activeUser}>
              <div className="messages-dashboard">
                <h2 className="d-flex">New Messages <div className="ml-3 mt-2 number-of-items">{this.state.allMessages.length}</div></h2>
                <Messages 
                  allMessages={this.state.allMessages}/>
              </div>
              <div className="issues-dashboard d-flex flex-fill">
                <div className="flex-fill">
                  <h2 className="d-flex">New Issues <div className="ml-3 mt-2 number-of-items">{this.state.allIssues.length}</div></h2>
                  <Issues 
                    allIssues={this.state.allIssues}/>
                </div>
                <div className="resolved-issues-dashboard flex-fill">
                <h2 className="d-flex">Resolved Issues <div className="ml-3 mt-2 number-of-items">0</div></h2>
                
                  There are no resolved issues to show
                </div>
              </div>
          </Dashboard>
        </Route>
        <Route exact path="/tenants">
          <Tenants 
          allTenants={this.state.allTenants}
          addNewTenant={this.addNewTenant}
          deleteTenant={this.deleteTenant}
          editTenantDetails={this.editTenantDetails}
          /> 
        </Route>
        <Route exact path="/messages">
          <Messages
          allMessages={this.state.allMessages}
          activeUser={this.state.activeUser}
          createNewItem={this.createNewMessage}
          removeMessage={this.removeMessage}
          addMessageComment={this.addMessageComment}
          updateItemDetails={this.updateMessageItem}
          />
        </Route>
        <Route exact path="/issues">
          <Issues 
          allIssues={this.state.allIssues}
          activeUser={this.state.activeUser}
          createNewItem={this.reportNewIssue}
          removeIssue={this.removeIssue}
          addIssueComment={this.addIssueComment}
          updateItem={this.updateIssueItem}
          updateItemDetails={this.updateIssueItem}
          />
        </Route>
        <Route exact path="/voting">
          <Voting/>
        </Route>
        
      </React.Fragment>
    );
  }
}

export default App;
