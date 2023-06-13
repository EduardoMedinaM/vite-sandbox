import { ReduxProvider } from '../../utils/testWrappers';
import Counter from '.';

export default {
  title: 'Demos/Counter',
  component: Counter,
  decorators: [(story) => <ReduxProvider>{story()}</ReduxProvider>],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Default = {};
