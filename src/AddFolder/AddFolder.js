import React from 'react';

import cuid from 'cuid';

import './AddFolder.css';

export default class AddFolder extends React.Component {

    formSubmit ( e ) {
        
        e.preventDefault ();
    
        const form = new FormData ( e.target );

        const formValuesArray = {

            id: cuid (),

            name: form.get ( 'folder-name-input' ),

        };
        
        this.props.addFolder ( formValuesArray );

        this.props.routerProps.history.push ( `/folder/${ formValuesArray.id }` );

    }

    render () {

        return (

            <section id = 'add-folder-container' aria-label = 'Add a folder form'>

                <form id = 'add-folder-form'  onSubmit={e => this.formSubmit(e)}>

                    <div className = 'add-folder-form-element-container'>

                        <label htmlFor = 'folder-name-input'>Name</label>
                            
                        <input type = 'text' name = 'folder-name-input' id = 'folder-name-input' placeholder = 'Folder name'/>

                    </div>

                    <div className = 'add-folder-form-element-container'>

                        <button type = 'submit'>Add folder</button>

                    </div>
                            
                    <div className = 'add-folder-error message-container'>

                    </div>

                </form>
                    
            </section>

        );

    }

}