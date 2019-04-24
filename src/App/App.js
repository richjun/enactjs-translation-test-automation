import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

import css from './App.less';
import { $L } from '@enact/i18n/$L/$L';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			{$L(props.contents)}
		</div>
	)
});

export default MoonstoneDecorator(App);
