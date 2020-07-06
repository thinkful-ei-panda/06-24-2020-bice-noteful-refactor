import React from 'react'

import { CONFIG } from '../config'

import Context from '../Context/Context'

import cuid from 'cuid'

import './AddNote.css'

export default class AddNote extends React.Component {

    static contextType = Context;

    formSubmit ( e ) {
        
        e.preventDefault ()
    
        const form = new FormData ( e.target )
        
        const date = new Date ()
        
        const formValuesArray = {

            content: form.get ( 'note-content-input' ),

            folderId: form.get ( 'note-folder-select' ),

            id: cuid (),

            modified: date.toISOString (),

            name: form.get ( 'note-name-input' ),

        }
        
        fetch ( `${ CONFIG.API_ENDPOINT_NOTES }/`, {

            method: 'POST',
			body: JSON.stringify ( formValuesArray ),
            headers: { 'content-type': 'application/json' }

        } )

        .then ( res => {

            if ( !res.ok ) throw new Error ( res.status )

            return res.json ()

        } )
    
        .then ( data => { 
            
            this.context.addNote ( formValuesArray )
        
            let selectVal = form.get ( 'note-folder-select' )
    
            this.props.routerProps.history.push ( `/folder/${ selectVal }` )

        } )
    
        .catch ( error => this.setState ( { error } ) )

    }

    render () {
        
        return (

            <section id = 'add-note-container' aria-label = 'Add a note form'>

                <form id = 'add-note-form'  onSubmit = { e => this.formSubmit ( e ) }>

                    <div className = 'add-note-form-element-container'>

                        <label htmlFor = 'note-name-input'>Name</label>
                            
                        <input type = 'text' name = 'note-name-input' id = 'note-name-input' placeholder = 'Note name'/>

                    </div>

                    <div className = 'add-note-form-element-container'>

                        <label htmlFor = 'note-content-input'>Content</label>

                        <textarea id = 'note-content-input' name = 'note-content-input' placeholder = 'Note content' required></textarea>

                    </div>

                    <div className = 'add-note-form-element-container'>

                        <label htmlFor = 'note-folder-select'>Select a folder</label>

                        <select id = 'note-folder-select' name = 'note-folder-select' required onChange = { ( e ) => this.context.folderToHighlight ( e.target.value ) }>

                                    <option id = 'default'>Choose a folder</option>

                                    { this.context.folders.map ( folder => (
                                        
                                        <option key = { folder.id } id = { folder.id } value = { folder.id }>{ folder.name }</option>

                                    ) ) }


                                </select>

                    </div>
                    
                    <div className = 'add-note-form-element-container'>

                        <button type = 'submit'>Add note</button>

                    </div>

                    <div className = 'add-note-error message-container'>
                        
                        { this.context.error }
    
                    </div>

                </form>
                    
            </section>

        )

    }

}