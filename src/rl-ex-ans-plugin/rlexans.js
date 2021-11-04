import RlExAnsEditing from './rlexansediting';
import RlExAnsUI from './rlexansui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class RlExAns extends Plugin {
    static get requires() {
        return [ RlExAnsEditing, RlExAnsUI ];
    }
}
