## Description

Gitdude.com adds an unobtrusive comment on your commits with ESLint code improvement tips. It is easy to setup and helps improve your code. An example of a comment:

<img src="https://raw.githubusercontent.com/lassegit/gitdude.com/master/public/example.jpg" width="666">


## Demo

Check out the [commits in this repository](https://github.com/lassegit/gitdude.com/commits/master) to see gitdude.com in action.


## Available ESLint configs and plugins

Here are a list of available ESLint configs and plugins:
- eslint@3.19.0 [link](https://github.com/eslint/eslint)
- babel-eslint@7.2.3 [link](https://github.com/babel/babel-eslint)
- eslint-config-airbnb@15.0.1 [link](https://www.npmjs.com/package/eslint-config-airbnb), [info](https://github.com/airbnb/javascript)
- eslint-config-canonical@5.1.0 [link](https://github.com/gajus/eslint-config-canonical)
- eslint-config-es@0.8.11 [link](https://github.com/thenativeweb/eslint-config-es)
- eslint-config-fbjs@1.1.1 [link](https://www.npmjs.com/package/eslint-config-fbjs)
- eslint-plugin-react@7.0.1 [link](https://github.com/yannickcr/eslint-plugin-react)
- eslint-config-google@0.8.0 [link](https://github.com/google/eslint-config-google)
- eslint-plugin-shopify@16.0.1 [link](https://github.com/Shopify/eslint-plugin-shopify)
- eslint-config-xo@0.18.1 [link](https://github.com/sindresorhus/eslint-config-xo)
- eslint-config-standard@10.2.1 [link](https://github.com/feross/eslint-config-standard)
- eslint-plugin-standard@3.0.1 [link](https://github.com/xjamundx/eslint-plugin-standard)
- prettier-standard@6.0.0 [link](https://github.com/sheerun/prettier-standard)
- eslint-config-supermind@0.31.0 [link](https://github.com/supermind/eslint-config-supermind)
- eslint-plugin-react-native@2.3.2 [link](https://github.com/Intellicode/eslint-plugin-react-native)
- eslint-plugin-vue@3.3.0 [link](https://github.com/vuejs/eslint-plugin-vue)
- eslint-plugin-mongodb@0.2.4 [link](https://github.com/nfroidure/eslint-plugin-mongodb)
- eslint-plugin-ember@3.5.0 [link](https://github.com/netguru/eslint-plugin-ember)
- eslint-plugin-meteor@@latest [link](https://github.com/dferber90/eslint-plugin-meteor)
- eslint-plugin-ava@4.2.1 [link](https://github.com/avajs/eslint-plugin-ava)
- eslint-plugin-lodash@2.4.3 [link](https://github.com/wix/eslint-plugin-lodash)
- eslint-plugin-angular@3.0.0 [link](https://github.com/Gillespie59/eslint-plugin-angular) [info](https://github.com/johnpapa/angular-styleguide)
- eslint-plugin-css-modules@2.7.2 [link](https://github.com/atfzl/eslint-plugin-css-modules)

Inspiration from [A list of awesome ESLint plugins, configs, etc.](https://github.com/dustinspecker/awesome-eslint).

## Pre-configuations

To be done.


## Precautions

- If you call (e.g. extends or plugins) a non-installed package the linting will fail. You can always check the error message under your repository's setting page => webhook.

- Currently ['.js', '.jsx', '.es6', '.es5', '.es'] files are linted. If you have a special file extension that you use, you are welcome to open an issue.

- Questions, suggestions, tips, critique and commits welcome.

- If webhook isn't being setup for your organisation owned repository then you need to grant it access under: https://github.com/organizations/YOUR_ORGANISATION_NAME/settings/oauth_application_policy

---
Build using the [React Starter Kit](https://github.com/kriasoft/react-starter-kit).

Web site: [Gitdude.com](https://gitdude.com).
