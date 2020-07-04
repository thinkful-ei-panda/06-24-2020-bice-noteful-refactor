import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { STORE } from './Store';

import Header from './Header/Header';

import Sidebar from './Sidebar/Sidebar';

import NoteList from './NoteList/NoteList';

import AddNote from './AddNote/AddNote';

import AddFolder from './AddFolder/AddFolder';

import ErrorPage from './ErrorPage/ErrorPage';

import './App.css';

export default class App extends React.Component {

	selectFolderHighlight = '';

	constructor ( props ) {

		super ( props );
	
		this.state = { ...STORE };

	}

	addNote ( addNoteFormValues ) {

		this.setState ({
	
			notes: [ ...this.state.notes, addNoteFormValues ]
	  
		});
	
	}

	deleteNote ( noteId ) {

		const notes = this.state.notes.filter ( note => note.id !== noteId );
		
		this.setState ( {
		
		folders: [ ...this.state.folders ],

		notes: notes

		} );

	}

	addFolder ( addFolderFormValues ) {

		this.setState ({
	
			folders: [ ...this.state.folders, addFolderFormValues ]
	  
		});
	
	}

	folderToHighlight ( folderId ) {
		
		console.log ( folderId );
		
		this.selectFolderHighlight = folderId;

		this.forceUpdate ();

	}

	render () {

		return (

			<div className = 'app'>
				
				<Header key = 'Header' />

				<div id = 'flex-wrapper'>

					<Route key = 'sideBarRoute' path = '/' render = { ( routerProps ) => ( <Sidebar key = 'main-home' routerProps = { routerProps } state = { this.state } selectFolderHighlight = { this.selectFolderHighlight }/> ) } />

					<main>
							
						<Switch>

							<Route key = 'homePage' exact path = '/' render = { ( routerProps ) => ( <NoteList key = 'NoteList' routerProps = { routerProps } state = { this.state } deleteNote = { note => this.deleteNote ( note ) } /> ) } />

							<Route key = 'NoteList' exact path = '/folder/:folderId' render = { ( routerProps ) => ( <NoteList key = 'NoteList' routerProps = { routerProps } state = { this.state } deleteNote = { note => this.deleteNote ( note ) } /> ) } />

							<Route key = 'NoteList' exact path = '/notes/:noteId' render = { ( routerProps ) => ( <NoteList key = 'NoteList' routerProps = { routerProps } state = { this.state } deleteNote = { note => this.deleteNote ( note ) } /> ) } />
							
							<Route 
								key = 'addNote' 
								exact path = '/add-note' 
								render = { ( routerProps ) => ( <AddNote key = 'AddNote' routerProps = { routerProps } state = { this.state } addNote = { note => this.addNote ( note ) } folderToHighlight = { folder => this.folderToHighlight ( folder ) }/> ) }
								tmp = { tmp => this.tmp ( tmp ) } 
							/>
							
							<Route key = 'addFolder' exact path = '/add-folder' render = { ( routerProps ) => ( <AddFolder key = 'AddFolder' routerProps = { routerProps } state = { this.state } addFolder = { folder => this.addFolder ( folder ) } /> ) } />

							<Route key = 'error' component = { ErrorPage } />

						</Switch>
					
					</main>

				</div>

			</div>
		
		);

	}

}
