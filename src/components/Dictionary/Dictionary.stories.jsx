import Dictionary from '.';
import { ReduxProvider } from '../../utils/testWrappers';

export default {
	title: 'Demos/Dictionary',
	component: Dictionary,
	decorators: [(story) => <ReduxProvider>{story()}</ReduxProvider>],
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

export const Default = {};
