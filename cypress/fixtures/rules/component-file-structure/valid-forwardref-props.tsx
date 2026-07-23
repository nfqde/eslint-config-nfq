import {forwardRef} from 'react';

import {observer} from 'mobx-react-lite';

interface ComponentProps {
    label: string;
}

const TextareaField = observer(forwardRef<HTMLTextAreaElement, ComponentProps>((props, ref) => (
    <textarea ref={ref} aria-label={props.label} />
)));

TextareaField.displayName = 'TextareaField';

export {TextareaField};
