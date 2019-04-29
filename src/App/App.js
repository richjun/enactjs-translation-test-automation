import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import $L from '@enact/i18n/$L';

const App = kind({
	name: 'App',
	render: (props) => {
		return (
			<div {...props}>
				{$L(props.contents)}
			</div>
		);
	}
});

export default MoonstoneDecorator(App);
