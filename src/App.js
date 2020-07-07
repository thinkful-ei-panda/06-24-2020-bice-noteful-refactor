import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { CONFIG } from './config'

import Context from './Context/Context'

import Header from './Header/Header'

import Sidebar from './Sidebar/Sidebar'

import NoteList from './NoteList/NoteList'

import AddNote from './AddNote/AddNote'

import AddFolder from './AddFolder/AddFolder'

import ErrorPage from './ErrorPage/ErrorPage'

import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

import './App.css'

export default class App extends React.Component {
	
	state = { 
		folders: [],
		notes: [],
		selectFolderHighlight: '',
		error: null
	}

	static getDerivedStateFromError ( error ) {
	
		return { hasError: true }
	
	}
	
	componentDidMount () {
		
		Object.keys ( CONFIG ).forEach ( item => {

			fetch ( CONFIG[ item ], {
				method: 'GET',
				headers: {

					'content-type': 'application/json',

				}

			} )

			.then ( res => {

				if ( !res.ok ) throw new Error ( res.status )

				return res.json ()

			} )
		
			.then ( data => { 
				
				let key = CONFIG[ item ].slice ( 22, CONFIG[ item ].length )
				
				this.setState ( { [key]: [ ...data ] } )

			} )
		
			.catch ( error => this.setState ( { error } ) )

		} )

	}

	addNote = ( addNoteFormValues ) => { this.setState ( { notes: [ ...this.state.notes, addNoteFormValues ] } ) }

	deleteNote = ( noteId ) => {

		const notes = this.state.notes.filter ( note => note.id !== noteId )
		
		this.setState ( { notes: notes } )

	}

	addFolder = ( addFolderFormValues ) => { this.setState ( { folders: [ ...this.state.folders, addFolderFormValues ] } ) }

	folderToHighlight = ( folderId ) => { this.setState ( { selectFolderHighlight: folderId } )	}

	render () {

		const contextValue = {

			folders: this.state.folders,

			notes: this.state.notes,

			selectFolderHighlight: this.state.selectFolderHighlight,

			error: this.state.error,

			addNote: this.addNote,

			deleteNote: this.deleteNote,

			addFolder: this.addFolder,

			folderToHighlight: this.folderToHighlight,

		}

		return (

			<Context.Provider value = { contextValue }>

				<div className = 'app'>
					
					<ErrorBoundary>
					
						<Header key = 'Header' />
					
					</ErrorBoundary>
					
					<div id = 'flex-wrapper'>
					
						<ErrorBoundary>
							
							<Route key = 'sideBarRoute' path = '/' render = { ( routerProps ) => ( <Sidebar key = 'Sidebar' routerProps = { routerProps } /> ) } />
						
						</ErrorBoundary>

						<main>
								
							<Switch>
	
								<ErrorBoundary>
	
									<Route key = 'homePage' exact path = '/' render = { ( routerProps ) => ( <NoteList key = 'NoteList' routerProps = { routerProps } /> ) } />

									<Route key = 'FolderList' exact path = '/folder/:folderId' render = { ( routerProps ) => ( <NoteList key = 'NoteList' routerProps = { routerProps } /> ) } />

									<Route key = 'NoteList' exact path = '/notes/:noteId' render = { ( routerProps ) => ( <NoteList key = 'NoteList' routerProps = { routerProps } /> ) } />
									
									<Route key = 'addNote' exact path = '/add-note' render = { ( routerProps ) => ( <AddNote key = 'AddNote' routerProps = { routerProps }/> ) } />

									<Route key = 'addFolder' exact path = '/add-folder' render = { ( routerProps ) => ( <AddFolder key = 'AddFolder' routerProps = { routerProps } /> ) } />

								</ErrorBoundary>

								<Route key = 'error' component = { ErrorPage } />
							
							</Switch>
						
						</main>

					</div>

				</div>

			</Context.Provider>
		
		)

	}

}
