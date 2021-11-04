// simplebox/insertsimpleboxcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertRlExCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createRlEx( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'rlEx' );

        this.isEnabled = allowedIn !== null;
    }
}

//https://github.com/ckeditor/ckeditor5/issues/5566
//https://stackoverflow.com/questions/53208435/how-to-insert-an-image-with-a-caption-into-a-custom-element-in-ckeditor-5

function createRlEx( writer ) {
    const simpleBox = writer.createElement( 'rlEx' );
    const simpleBoxDescription = writer.createElement( 'rlExDescription' );
    const rlExCallout = writer.createElement( 'rlExCallout' );

    writer.append( rlExCallout, simpleBox );

    writer.append( simpleBoxDescription, simpleBox );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', simpleBoxDescription );

    return simpleBox;

}
