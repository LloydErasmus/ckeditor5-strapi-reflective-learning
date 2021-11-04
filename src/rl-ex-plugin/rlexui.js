// simplebox/rlexui.js

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from './icons/ex.svg';

export default class RlExUI extends Plugin {
    init() {

        const editor = this.editor;
        const t = editor.t;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'rlEx', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertRlEx' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // trlated and change when the language of the editor changes.
                label: t( 'Callout' ),
                withText: true,
                icon: imageIcon,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertRlEx' ) );



            return buttonView;
        } );
    }
}
