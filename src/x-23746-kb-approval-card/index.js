import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-card';
import '@servicenow/now-highlighted-value';
import '@servicenow/now-rich-text';
import '@servicenow/now-modal';
import actionHandlers from './actionHandlers.js';

const view = (state, {updateState}) => {
	const number = state.record['document_id.number'];
	const kb = state.record['document_id.kb_knowledge_base'];
	const kb_category = state.record['document_id.kb_category'];
	const short_description = state.record['document_id.short_description'];
	const author = state.record['document_id.author'];
	const text = state.record['document_id.text'];
	const cardActions = [
		{label: 'Approve', variant: 'secondary-positive'},
		{label: 'Reject', variant: 'secondary-negative'}
	  ];

	return (
		<div>
			<now-card size="lg" interaction="none" slot="content">
			<now-card-header
				tagline={{label: kb.display_value + ' > '+ kb_category.display_value, icon: "document-outline"}}
				heading={{label: short_description.display_value, size: 'sm', lines: 2}}
				caption={{label: author.display_value, lines: 1}}
				actions={[{id: 'view-action', icon: 'eye-outline', label: 'View article'}]}>
				<now-highlighted-value 
					label={number.display_value} 
					color="low" 
					slot="metadata">
				</now-highlighted-value>
			</now-card-header>
			<now-card-divider block-spacing='lg'></now-card-divider>
			<now-card-actions items={cardActions} />
			</now-card>

			<now-modal size="md" opened={state.modalState.modalOpened} headerLabel={short_description.display_value}>
				<slot name='defaultSlot'>
					<now-rich-text html={text.display_value}></now-rich-text>
				</slot>
			</now-modal>
		</div>
	);
};

createCustomElement('x-23746-kb-approval-card', {
	renderer: {type: snabbdom},
	view,
	styles,
	properties: {
		/**
		 * sys_id of approval record
		 */
		sysid: {
			default: '',
			required: true,
			schema: {type: 'string'}
		}
	},
	...actionHandlers
});
