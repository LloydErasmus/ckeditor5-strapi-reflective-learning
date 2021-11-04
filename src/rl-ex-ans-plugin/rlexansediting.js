// simplebox/simpleboxediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertRlExAnsCommand from './insertrlexanscommand';


export default class RlExAnsEditing extends Plugin {

    static get requires() {
        return [ Widget ];
    }

    init() {

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertRlExAns', new InsertRlExAnsCommand( this.editor ) );
    }

    _defineSchema() {

        const schema = this.editor.model.schema;

        schema.register( 'rlExAns', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'rlExAnsCallout', {
          // isContent: true,
          allowIn: 'rlExAns',
          isObject: true,
          // isLimit: true,
        } );


        schema.register( 'rlExAnsDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'rlExAns',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        // ADDED
        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'rlExAnsDescription' ) && childDefinition.name == 'rlExAns' ) {
                return false;
            }
        } );
    }

     _defineConverters() {

        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'rlExAns',
            view: {
                name: 'section',
                classes: 'simple-box-female'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'rlExAns',
            view: {
                name: 'section',
                classes: 'simple-box-female'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'rlExAns',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'simple-box-female' } );

                return toWidget( section, viewWriter, { label: 'simple-box-female' } );
            }
        } );

         // <rlExAnsCallout> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'rlExAnsCallout',
            view: {
                name: 'p',
                classes: 'person-ex-ans'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'rlExAnsCallout',
            view: {
                name: 'p',
                classes: 'person-ex-ans'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'rlExAnsCallout',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'p', { class: 'person-ex-ans' } );
                return toWidget( div, viewWriter, { label: 'person-ex-ans' } );
            }
        } );


        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'rlExAnsDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'rlExAnsDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'rlExAnsDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'simple-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }

}
