import React from 'react'

import { CONFIG } from '../config'

import Context from '../Context/Context'

import cuid from 'cuid'

import './AddFolder.css'

export default class AddFolder extends React.Component {

    static contextType = Context

    formSubmit ( e ) {
        
        e.preventDefault ();
    
        const form = new FormData ( e.target )

        const formValuesArray = {

            id: cuid (),

            name: form.get ( 'folder-name-input' ),

        };
        
        fetch ( `${ CONFIG.API_ENDPOINT_FOLDERS }/`, {

            method: 'POST',
			body: JSON.stringify ( formValuesArray ),
            headers: { 'content-type': 'application/json' }

        } )

        .then ( res => {

            if ( !res.ok ) throw new Error ( res.status )

            return res.json ()

        } )
    
        .then ( () => { 
            
            this.context.addFolder ( formValuesArray )
        
            this.props.routerProps.history.push ( `/folder/${ formValuesArray.id }` )

        } )
    
        .catch ( error => this.setState ( { error } ) )

    }

    render () {

        return (

            <section id = 'add-folder-container' aria-label = 'Add a folder form'>

                <form id = 'add-folder-form'  onSubmit = { e => this.formSubmit ( e ) }>

                    <div className = 'add-folder-form-element-container'>

                        <label htmlFor = 'folder-name-input'>Name</label>
                            
                        <input type = 'text' name = 'folder-name-input' id = 'folder-name-input' placeholder = 'Folder name'/>

                    </div>

                    <div className = 'add-folder-form-element-container'>

                        <button type = 'submit'>Add folder</button>

                    </div>
                            
                    <div className = 'add-folder-error message-container'>
                        
                        { this.context.error }
                    
                    </div>

                </form>
                    
            </section>

        )

    }

}