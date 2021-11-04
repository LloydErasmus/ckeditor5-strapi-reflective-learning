import RlExEditing from './rlexediting';
import RlExUI from './rlexui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class RlEx extends Plugin {
    static get requires() {
        return [ RlExEditing, RlExUI ];
    }
}
