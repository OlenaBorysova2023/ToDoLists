import React from 'react'
import ProjectList from './components/Projects'
import PagesList from './components/Pages'
import CloseButton from './components/CloseButton.jsx'
import List from './components/List'
import REACT_API_KEY from './assets/apiKey.js'

function App() {
  const [createListMode, setCreateListMode] = React.useState({
    step1: false, 
    step2: false, 
    lists: [],
    projects: [],
    pages: []})

  const listElements = createListMode.lists.map(
    (element, index) => 
    <List key={index} {...element} />
  );

  const API = "https://beta.thmi.cloud/api/v1"
  const headers = {
    Authorization: `Bearer ${REACT_API_KEY}`,
    Accept: 'application/json'
  }

  let newList = React.useRef({});  


  function showProjectList() {
    fetch(`${API}/projects/list`, {headers}).then(response => 
      {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then(responseJSON => {
        setCreateListMode(prevItem => {
          return {...prevItem, step1: true, step2: false, projects: responseJSON}
        })
      }).catch((error) => {
        console.log(error)
      });
  }

  function exitCreateListMode() {
    newList.current = {}

    setCreateListMode(prevItem => {
      return {...prevItem, step1: false, step2: false, pages: []}
    })
  }

  function showPagesList(selected) {
    if (!selected.length) return false;

    newList.current.title = selected[0].name
    newList.current.id = selected[0].id  

    const requestLink = `${API}/${newList.current.id}/page/tree`;

    fetch(requestLink, {headers
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    }).then(responseJSON => {
      setCreateListMode(prevItem => {
        return {...prevItem, step1: false, step2: true, pages: responseJSON}
      })
    }).catch((error) => {
      console.log(error)
    });
  }

  function createNewList(allCheckedPages) {
    newList.current.items = allCheckedPages

    setCreateListMode(prevState => {
      prevState.lists.push(newList.current)
      return {...prevState, step1: false, step2: false, pages: []};
    })
    
    newList.current = {}
    
  }

  return (
    <>
      <h1>To-Do Lists</h1>
      { !createListMode.step1 && !createListMode.step2 &&
      <div className="card">
        <button onClick={showProjectList} className='btn-big'>
          Create new list
        </button>
      </div>
      }
 
      {createListMode.step1 && 
      <div className='card form'>
        <h3>Create List</h3>
        <p>Please choose list's title from the list of projects:</p>
         <ProjectList onFormSubmit={showPagesList} data={createListMode.projects}/> 
         <CloseButton handleClick={exitCreateListMode} />
        
      </div>}

      {createListMode.step2 && 
      <div className='card form'>
        <h3>Create List</h3>
        <p>Please choose pages for your list:</p>
         <PagesList 
            handleClick={showPagesList} 
            data={createListMode.pages} 
            onFormSubmit={createNewList}/> 
         <CloseButton handleClick={exitCreateListMode} />
      </div>}

      <div id="lists" className='lists'>
        {listElements}
      </div>
    </>
  )
}

export default App
