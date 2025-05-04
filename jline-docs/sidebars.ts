import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'terminal',
    'line-reader',
    'tab-completion',
    'history',
    {
      type: 'category',
      label: 'Advanced Features',
      items: [
        'advanced/syntax-highlighting',
        'advanced/interactive-features',
        // These will be created later
        // 'advanced/key-bindings',
        // 'advanced/widgets',
        // 'advanced/custom-terminals'
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/overview',
        'modules/builtins',
        'modules/style',
        'modules/console',
        'modules/console-ui',
        'modules/terminal-providers',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        // These will link to JavaDoc
        // 'api/terminal',
        // 'api/line-reader',
        // 'api/completer',
        // 'api/history'
      ],
    },
  ],
};

export default sidebars;
