// simplebox/simpleboxediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertRlExCommand from './insertrlexcommand';


export default class RlExEditing extends Plugin {

    static get requires() {
        return [ Widget ];
    }

    init() {

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertRlEx', new InsertRlExCommand( this.editor ) );
    }

    _defineSchema() {

        const schema = this.editor.model.schema;

        schema.register( 'rlEx', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'rlExCallout', {
          // isContent: true,
          isObject: true,
          allowIn: 'rlEx',
          // isLimit: true,
        } );


        schema.register( 'rlExDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'rlEx',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        // ADDED
        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'rlExDescription' ) && childDefinition.name == 'rlEx' ) {
                return false;
            }
        } );
    }

     _defineConverters() {

        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'rlEx',
            view: {
                name: 'section',
                classes: 'simple-box-male'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'rlEx',
            view: {
                name: 'section',
                classes: 'simple-box-male'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'rlEx',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'simple-box-male' } );

                return toWidget( section, viewWriter, { label: 'simple-box-male' } );
            }
        } );

         // <rlExCallout> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'rlExCallout',
            view: {
                name: 'p',
                classes: 'person-ex'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'rlExCallout',
            view: {
                name: 'p',
                classes: 'person-ex'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'rlExCallout',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'p', { class: 'person-ex' } );
                return toWidget( div, viewWriter, { label: 'person-ex' } );
            }
        } );


        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'rlExDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'rlExDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'rlExDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'simple-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }

}
