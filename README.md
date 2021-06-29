# [Part 10 - React Native](https://fullstackopen.com/en/part10/introduction_to_react_native)
Rate Repository App for Full Stack Open 2021

React Native is a framework for developing native Android and iOS applications using JavaScript and React. It provides a set of cross-platform components that behind the scenes utilize the platform's native components. Using React Native allows us to bring all the familiar features of React such as JSX, components, props, state, and hooks into native application development. On top of that we are able to utilize many familiar libraries in React ecosystem such as react-redux, react-apollo, react-router and many more.


## Initializing the application

For the development of our application, we will be using Expo. Expo is a platform that eases the setup, development, building, and deployment of React Native applications. Let's get started with Expo by installing the expo-cli command-line interface:

    npm install --global expo-cli
    
Next, we can initialize our project in a rate-repository-app directory by running the following command:

    expo init rate-repository-app --template expo-template-blank@sdk-40

Note, that the @sdk-40 sets the project's Expo SDK version to 40, which supports React Native version 0.63. 

## Development environment emulators

Android and iOS devices such as tablets and phones can be emulated in computers using specific emulators. This is very useful for developing native applications. macOS users can use both Android and iOS emulators with their computers. Users of other operating systems such as Linux or Windows have to settle for Android emulators. Next, depending on your operating system follow one of these instructions on setting up an emulator:

[Set up Android emulator with Android Studio ](https://docs.expo.io/workflow/android-studio-emulator/?redirected)

After you have set up the emulator and it is running, start the Expo development tools as we did before, by running npm start. Depending on the emulator you are running either click the Run on Android device/emulator or Run on iOS simulator link. After clicking the link, Expo should connect to the emulator and you should eventually see the application in your emulator.

In addition to emulators, there is one extremely useful way to develop React Native applications with Expo, the Expo mobile app. With the Expo mobile app you can preview your application using your actual mobile device, which provides a bit more concrete development experience compared to emulators. To get started, install the Expo mobile app by following the instructions in the [Expo's documentation](https://docs.expo.io/versions/latest/get-started/installation/#2-mobile-app-expo-client-for-ios). Note that the Expo mobile app can only open your application if your mobile device is connected to the same local network (e.g. connected to the same Wi-Fi network) as the computer you are using for development.

## ESLint

Let's get started by installing the dependencies:

    npm install --save-dev eslint babel-eslint eslint-plugin-react
    
Next, let's add the ESLint configuration into a .eslintrc file into the rate-repository-app directory with the following content:

    {
      "plugins": ["react"],
      "settings": {
        "react": {
          "version": "detect"
        }
      },
      "extends": ["eslint:recommended", "plugin:react/recommended"],
      "parser": "babel-eslint",
      "env": {
        "browser": true
      },
      "rules": {
        "react/prop-types": "off",
        "semi": "error"
      }
    }
    
And finally, let's add a lint script to the package.json file to check the linting rules in specific files:

    {
      // ...
      "scripts": {
        "start": "expo start",
        "android": "expo start --android",
        "ios": "expo start --ios",
        "web": "expo start --web",
        "eject": "expo eject",
        "lint": "eslint ./src/**/*.{js,jsx} App.js --no-error-on-unmatched-pattern"
      },
      // ...
    }
    
In contrast to parts 1-8, we are using semicolons to terminate lines now, so we have added the rule semi to check that.

Now we can check that the linting rules are obeyed in JavaScript files in the src directory and in the App.js file by running npm run lint.

## Core components

Core components are a set of components provided by React Native which behind the scenes utilize the platform's native components.

    import React from 'react';
    import { Text } from 'react-native';

    const HelloWorld = props => {
      return <Text>Hello world!</Text>;
    };

There are a few notable differences between core components and DOM elements. The first difference is that the Text component is the only React Native component that can have textual children. 

The second notable difference is related to the event handlers. While working with the DOM elements we are used to adding event handlers such as onClick to basically any element such as <div> and <button>. In React Native we have to carefully read the [API documentation](https://reactnative.dev/docs/components-and-apis) to know what event handlers (as well as other props) a component accepts. For example, the Pressable component provides props for listening to different kind of press events. We can for example use the component's onPress prop for listening to press events:

    import React from 'react';
    import { Text, Pressable, Alert } from 'react-native';

    const PressableText = props => {
      return (
        <Pressable
          onPress={() => Alert.alert('You pressed the text!')}
        >
          <Text>You can press me</Text>
        </Pressable>
      );
    };

In the components directory create a file Main.jsx with the following content:

    import React from 'react';
    import Constants from 'expo-constants';
    import { Text, StyleSheet, View } from 'react-native';

    const styles = StyleSheet.create({
      container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
      },
    });

    const Main = () => {
      return (
        <View style={styles.container}>
          <Text>Rate Repository Application</Text>
        </View>
      );
    };

    export default Main;

Next, let's use the Main component in the App component in the App.js file which is located in our project's root directory. Replace the current content of the file with this:

    import React from 'react';

    import Main from './src/components/Main';

    const App = () => {
      return <Main />;
    };

    export default App;


As we have seen, Expo will automatically reload the application when we make changes to the code. However, there might be times when automatic reload isn't working and the application has to be reloaded manually. This can be achieved through the in-app developer menu.

You can access the developer menu by shaking your device or by selecting "Shake Gesture" inside the Hardware menu in the iOS Simulator. You can also use the ⌘D keyboard shortcut when your app is running in the iOS Simulator, or ⌘M when running in an Android emulator on Mac OS and Ctrl+M on Windows and Linux.

Once the developer menu is open, simply press "Reload" to reload the application. After the application has been reloaded, automatic reloads should work without the need for a manual reload.

## Style

There are many similarities in the way style properties are attached to React Native's core components and the way they are attached to DOM elements. In React Native most of the core components accept a prop called style. The style prop accepts an object with style properties and their values. These style properties are in most cases the same as in CSS, however, property names are in camelCase. This means that CSS properties such as padding-top and font-size are written as paddingTop and fontSize. Here is a simple example of how to use the style prop:

import React from 'react';
import { Text, View } from 'react-native';

const BigBlueText = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: 'blue', fontSize: 24, fontWeight: '700' }}>
        Big blue text
      </Text>
    </View>
  );
};

On top of the property names, you might have noticed another difference in the example. In CSS numerical property values commonly have a unit such as px, %, em or rem. In React Native all dimension related property values such as width, height, padding, and margin as well as font sizes are unitless. These unitless numeric values represent density-independent pixels. In case you are wondering what are the available style properties for certain core component, check the [React Native Styling Cheat Sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet).

In general, defining styles directly in the style prop is not considered such a great idea, because it makes components bloated and unclear. Instead, we should define styles outside the component's render function using the StyleSheet.create method. The StyleSheet.create method accepts a single argument which is an object consisting of named style objects and it creates a StyleSheet style reference from the given object. Here is an example of how to refactor the previous example using the StyleSheet.create method:

    import React from 'react';
    import { Text, View, StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
      container: {
        padding: 20,
      },
      text: {
        color: 'blue',
        fontSize: 24,
        fontWeight: '700',
      },
    });

    const BigBlueText = () => {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            Big blue text
          <Text>
        </View>
      );
    };

## Theming in React Native

Let's see how theming could work in practice in our application. We will be using a lot of text with different variations, such as different font sizes and colors. Because React Native does not support global styles, we should create our own Text component to keep the textual content consistent. Let's get started by adding the following theme configuration object in a theme.js file in the src directory:

    const theme = {
      colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
      },
      fontSizes: {
        body: 14,
        subheading: 16,
      },
      fonts: {
        main: 'System',
      },
      fontWeights: {
        normal: '400',
        bold: '700',
      },
    };

    export default theme;
    
Next, we should create the actual Text component which uses this theme configuration. Create a Text.jsx file in the components directory where we already have our other components. Add the following content to the Text.jsx file:

    import React from 'react';
    import { Text as NativeText, StyleSheet } from 'react-native';

    import theme from '../theme';

    const styles = StyleSheet.create({
      text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
      },
      colorTextSecondary: {
        color: theme.colors.textSecondary,
      },
      colorPrimary: {
        color: theme.colors.primary,
      },
      fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
      },
      fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
      },
    });

    const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
      const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
      ];

      return <NativeText style={textStyle} {...props} />;
    };

    export default Text;
    
Now we have implemented our own text component with consistent color, font size and font weight variants which we can use anywhere in our application. We can get different text variations using different props like this:

    import React from 'react';

    import Text from './Text';

    const Main = () => {
      return (
        <>
          <Text>Simple text</Text>
          <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
          <Text fontWeight="bold" fontSize="subheading">
            Bold subheading
          </Text>
          <Text color="textSecondary">Text with secondary color</Text>
        </>
      );
    };

    export default Main;

## Flexbox

Flexbox is a layout entity consisting of two separate components: a flex container and inside it a set of flex items. Flex container has a set of properties that control the flow of its items. To make a component a flex container it must have the style property display set as flex which is the default value for the display property. Here is an example of a flex container:

    import React from 'react';
    import { View, StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
      flexContainer: {
        flexDirection: 'row',
      },
    });

    const FlexboxExample = () => {
      return <View style={styles.flexContainer}>{/* ... */}</View>;
    };
    
Perhaps the most important properties of a flex container are the following:

flexDirection property controls the direction in which the flex items are laid out within the container. Possible values for this property are row, row-reverse, column (default value) and column-reverse. Flex direction row will lay out the flex items from left to right, whereas column from top to bottom. *-reverse directions will just reverse the order of the flex items.

justifyContent property controls the alignment of flex items along the main axis (defined by the flexDirection property). Possible values for this property are flex-start (default value), flex-end, center, space-between, space-around and space-evenly.

alignItems property does the same as justifyContent but for the opposite axis. Possible values for this property are flex-start, flex-end, center, baseline and stretch (default value).

Let's move on to flex items. As mentioned, a flex container can contain one or many flex items. Flex items have properties that control how they behave in respect of other flex items in the same flex container. To make a component a flex item all you have to do is to set it as an immediate child of a flex container:

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
      flexContainer: {
        display: 'flex',
      },
      flexItemA: {
        flexGrow: 0,
        backgroundColor: 'green',
      },
      flexItemB: {
        flexGrow: 1,
        backgroundColor: 'blue',
      },
    });

    const FlexboxExample = () => {
      return (
        <View style={styles.flexContainer}>
          <View style={styles.flexItemA}>
            <Text>Flex item A</Text>
          </View>
          <View style={styles.flexItemB}>
            <Text>Flex item B</Text>
          </View>
        </View>
      );
    };
    
One of the most commonly used properties of flex item is the flexGrow property. It accepts a unitless value which defines the ability for a flex item to grow if necessary. If all flex items have a flexGrow of 1, they will share all the available space evenly. If a flex item has a flexGrow of 0, it will only use the space its content requires and leave the rest of the space for other flex items.

Read the article [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) which has comprehensive visual examples of flexbox.

## Routing

With React Native we can use the entire React router's core, including the hooks and components. The only difference to the browser environment is that we must replace the BrowserRouter with React Native compatible NativeRouter, provided by the react-router-native library. Let's get started by installing the react-router-native library:

    npm install react-router-native
    
Using the react-router-native library will break Expo's web browser preview. However, other previews will work just like before. We can fix the issue by extending the Expo's Webpack configuration so that it transpiles the react-router-native library's sources with Babel. To extend the Webpack configuration we need to install the @expo/webpack-config library:

    npm install @expo/webpack-config --save-dev

Next, create a webpack.config.js file in the root directory of your project with the following content:

    const path = require('path');
    const createExpoWebpackConfigAsync = require('@expo/webpack-config');

    module.exports = async function(env, argv) {
      const config = await createExpoWebpackConfigAsync(env, argv);

      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'node_modules/react-router-native')],
      });

      return config;
    };

Finally, restart Expo's development tools so that our new Webpack configuration will be applied.

Now that the Expo's web browser preview is fixed, open the App.js file and add the NativeRouter component to the App component:

    import React from 'react';
    import { NativeRouter } from 'react-router-native';

    import Main from './src/components/Main';

    const App = () => {
      return (
        <NativeRouter>
          <Main />
        </NativeRouter>
      );
    };

    export default App;
    
Once the router is in place, let's add our first route to the Main component in the Main.jsx file:

    import React from 'react';
    import { StyleSheet, View } from 'react-native';
    import { Route, Switch, Redirect } from 'react-router-native';

    import RepositoryList from './RepositoryList';
    import AppBar from './AppBar';
    import theme from '../theme';

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.colors.mainBackground,
        flexGrow: 1,
        flexShrink: 1,
      },
    });

    const Main = () => {
      return (
        <View style={styles.container}>
          <AppBar />
          <Switch>
            <Route path="/" exact>
              <RepositoryList />
            </Route>
            <Redirect to="/" />
          </Switch>
        </View>
      );
    };

    export default Main;

## Form state management

First, let's install Formik:

    npm install formik
    
Next, create a file TextInput.jsx in the components directory with the following content:

    import React from 'react';
    import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

    const styles = StyleSheet.create({});

    const TextInput = ({ style, error, ...props }) => {
      const textInputStyle = [style];

      return <NativeTextInput style={textInputStyle} {...props} />;
    };

    export default TextInput;
    
Let's move on to the FormikTextInput component that adds the Formik's state bindings to the TextInput component. Create a file FormikTextInput.jsx in the components directory with the following content:

    import React from 'react';
    import { StyleSheet } from 'react-native';
    import { useField } from 'formik';

    import TextInput from './TextInput';
    import Text from './Text';

    const styles = StyleSheet.create({
      errorText: {
        marginTop: 5,
      },
    });

    const FormikTextInput = ({ name, ...props }) => {
      const [field, meta, helpers] = useField(name);
      const showError = meta.touched && meta.error;

      return (
        <>
          <TextInput
            onChangeText={value => helpers.setValue(value)}
            onBlur={() => helpers.setTouched(true)}
            value={field.value}
            error={showError}
            {...props}
          />
          {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
      );
    };

    export default FormikTextInput;
    
By using the FormikTextInput component we could refactor the BodyMassIndexForm component in the previous example like this:

    const BodyMassIndexForm = ({ onSubmit }) => {
      return (
        <View>
          <FormikTextInput name="mass" placeholder="Weight (kg)" />
          <FormikTextInput name="height" placeholder="Height (m)" />
          <Pressable onPress={onSubmit}>
            <Text>Calculate</Text>
          </Pressable>
        </View>
      );
    };

## Form validation

Let's get started by installing Yup:

    npm install yup
    
Next, as an example, let's create validation schema for the body mass index form we implemented earlier. We want to validate that both mass and height fields are present and they are numeric. Also the value of mass should be greater or equal to 1 and the value of height should be greater or equal to 0.5. Here is how we define the schema:

    import React from 'react';
    import * as yup from 'yup';

    // ...

    const validationSchema = yup.object().shape({
      mass: yup
        .number()
        .min(1, 'Weight must be greater or equal to 1')
        .required('Weight is required'),
      height: yup
        .number()
        .min(0.5, 'Height must be greater or equal to 0.5')
        .required('Height is required'),
    });

    const BodyMassIndexCalculator = () => {
      // ...

      return (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit} />}
        </Formik>
      );
    };

The validation is performed by default every time a field's value changes and when the handleSubmit function is called. If the validation fails, the function provided for the onSubmit prop of the Formik component is not called.

## Platform specific code

A big benefit of React Native is that we don't need to worry about whether the application is run on a Android or iOS device. However, there might be cases where we need to execute platform specific code. Such case could be for example using a different implementation of a component on a different platform.

We can access the user's platform through the Platform.OS constant:

    import { React } from 'react';
    import { Platform, Text, StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
      text: {
        color: Platform.OS === 'android' ? 'green' : 'blue',
      },
    });

    const WhatIsMyPlatform = () => {
      return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
    };
    
Possible values for the Platform.OS constant are android and ios. Another useful way to define platform specific code branches is to use the Platform.select method. Given an object where keys are one of ios, android, native and default, the Platform.select method returns the most fitting value for the platform the user is currently running on. We can rewrite the styles variable in the previous example using the Platform.select method like this:

    const styles = StyleSheet.create({
      text: {
        color: Platform.select({
          android: 'green',
          ios: 'blue',
          default: 'black',
        }),
      },
    });
    
We can even use the Platform.select method to require a platform specific component:

    const MyComponent = Platform.select({
      ios: () => require('./MyIOSComponent'),
      android: () => require('./MyAndroidComponent'),
    })();

    <MyComponent />;
    
However, a more sophisticated method for implementing and importing platform specific components (or any other piece of code) is to use the .ios.jsx and .android.jsx file extensions. Note that the .jsx extension can as well be any extensions recognized by the bundler, such as .js. We can for example have files Button.ios.jsx and Button.android.jsx which we can import like this:

    import React from 'react';

    import Button from './Button';

    const PlatformSpecificButton = () => {
      return <Button />;
    };
    
Now, the Android bundle of the application will have the component defined in the Button.android.jsx whereas the iOS bundle the one defined in the Button.ios.jsx file.

## Communicating with server

React Native provides Fetch API for making HTTP requests in our applications. React Native also supports the good old XMLHttpRequest API which makes it possible to use third-party libraries such as Axios. These APIs are the same as the ones in the browser environment and they are globally available without the need for an import.

People who have used both Fetch API and XMLHttpRequest API most likely agree that the Fetch API is easier to use and more modern. However, this doesn't mean that XMLHttpRequest API doesn't have its uses. For the sake of simplicity, we will be only using the Fetch API in our examples.

Sending HTTP requests using the Fetch API can be done using the fetch function. The first argument of the function is the URL of the resource:

    fetch('https://my-api.com/get-end-point');
    
The default request method is GET. The second argument of the fetch function is an options object, which you can use to for example to specify a different request method, request headers, or request body:

    fetch('https://my-api.com/post-end-point', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'firstValue',
        secondParam: 'secondValue',
      }),
    });
    
Note that these URLs are made up and won't (most likely) send a response to your requests. In comparison to Axios, the Fetch API operates on a bit lower level. For example, there isn't any request or response body serialization and parsing. This means that you have to for example set the Content-Type header by yourself and use JSON.stringify method to serialize the request body.

The fetch function returns a promise which resolves a Response object. Note that error status codes such as 400 and 500 are not rejected like for example in Axios. In case of a JSON formatted response we can parse the response body using the Response.json method:

    const fetchMovies = async () => {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();

      return json;
    };

Now that we know the end point's URL let's use the actual server-provided data in our reviewed repositories list. We are currently using mock data stored in the repositories variable. Remove the repositories variable and replace the usage of the mock data with this piece of code in the RepositoryList.jsx file in the components directory:

    import React, { useState, useEffect } from 'react';
    // ...

    const RepositoryList = () => {
      const [repositories, setRepositories] = useState();

      const fetchRepositories = async () => {
        // Replace the IP address part with your own IP address!
        const response = await fetch('http://192.168.100.16:5000/api/repositories');
        const json = await response.json();

        console.log(json);

        setRepositories(json);
      };

      useEffect(() => {
        fetchRepositories();
      }, []);

      // Get the nodes from the edges array
      const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

      return (
        <FlatList
          data={repositoryNodes}
          // Other props
        />
      );
    };

    export default RepositoryList;

Let's refactor the component's code by extract the data fetching code into its own hook. Create a directory hooks in the src directory and in that hooks directory create a file useRepositories.js with the following content:

    import { useState, useEffect } from 'react';

    const useRepositories = () => {
      const [repositories, setRepositories] = useState();
      const [loading, setLoading] = useState(false);

      const fetchRepositories = async () => {
        setLoading(true);

        // Replace the IP address part with your own IP address!
        const response = await fetch('http://192.168.100.16:5000/api/repositories');
        const json = await response.json();

        setLoading(false);
        setRepositories(json);
      };

      useEffect(() => {
        fetchRepositories();
      }, []);

      return { repositories, loading, refetch: fetchRepositories };
    };

    export default useRepositories;
    
Now that we have a clean abstraction for fetching the reviewed repositories, let's use the useRepositories hook in the RepositoryList component:

    import React from 'react';
    // ...
    import useRepositories from '../hooks/useRepositories';

    const RepositoryList = () => {
      const { repositories } = useRepositories();

      const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

      return (
        <FlatList
          data={repositoryNodes}
          // Other props
        />
      );
    };

    export default RepositoryList;
    
That's it, now the RepositoryList component is no longer aware of the way the repositories are acquired. 

## GraphQL and Apollo client

In our React Native application, we will be using the same @apollo/client library as in part 8. Let's get started by installing the library along with the graphql library which is required as a peer dependency:

    npm install @apollo/client graphql
    
Next, let's create a utility function for creating the Apollo Client with the required configuration. Create a utils directory in the src directory and in that utils directory create a file apolloClient.js. In that file configure the Apollo Client to connect to the Apollo Server:

    import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

    const httpLink = createHttpLink({
      // Replace the IP address part with your own IP address!
      uri: 'http://192.168.100.16:5000/graphql',
    });

    const createApolloClient = () => {
      return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
      });
    };

    export default createApolloClient;
    
The URL used to connect to the Apollo Server is otherwise the same as the one you used with the Fetch API expect the path is /graphql. Lastly, we need to provide the Apollo Client using the ApolloProvider context. We will add it to the App component in the App.js file:

    import React from 'react';
    import { NativeRouter } from 'react-router-native';
    import { ApolloProvider } from '@apollo/client';

    import Main from './src/components/Main';
    import createApolloClient from './src/utils/apolloClient';

    const apolloClient = createApolloClient();

    const App = () => {
      return (
        <NativeRouter>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </NativeRouter>
      );
    };

    export default App;

## Environment variables

We have previously learned that we can provide running programs with environment variables. These variables can be defined in the command line or using environment configuration files such as .env files and third-party libraries such as Dotenv. Unfortunately, React Native doesn't have direct support for environment variables. However, we can access the Expo configuration defined in the app.json file at runtime from our JavaScript code. This configuration can be used to define and access environment dependant variables.

The configuration can be accessed by importing the Constants constant from the expo-constants module as we have done a few times before. Once imported, the Constants.manifest property will contain the configuration. Let's try this by logging Constants.manifest in the App component:

    import React from 'react';
    import { NativeRouter } from 'react-router-native';
    import { ApolloProvider } from '@apollo/client';
    import Constants from 'expo-constants';

    import Main from './src/components/Main';
    import createApolloClient from './src/utils/apolloClient';

    const apolloClient = createApolloClient();

    const App = () => {
      console.log(Constants.manifest);

      return (
        <NativeRouter>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </NativeRouter>
      );
    };

    export default App;
    
You should now see the configuration in the logs.

The next step is to use the configuration to define environment dependant variables in our application. Let's get started by renaming the app.json file to app.config.js. Once the file is renamed, we can use JavaScript inside the configuration file. Change the file contents so that the previous object:

    {
      "expo": {
        "name": "rate-repository-app",
        // rest of the configuration...
      }
    }
    
Is turned into an export, which contains the contents of the expo property:

    export default {
       name: 'rate-repository-app',
       // rest of the configuration...
    };
    
Expo has reserved an extra property in the configuration for any application-specific configuration. To see how this works, let's add an env variable into our application's configuration:

    export default {
       name: 'rate-repository-app',
       // rest of the configuration...
       extra: {
         env: 'development'
       },
    };
    
Restart Expo development tools to apply the changes and you should see that the value of Constants.manifest property has changed and now includes the extra property containing our application-specific configuration. Now the value of the env variable is accessible through the Constants.manifest.extra.env property.

Because using hard coded configuration is a bit silly, let's use an environment variable instead:

    export default {
       name: 'rate-repository-app',
       // rest of the configuration...
       extra: {
         env: process.env.ENV,
       },
    };
    
As we have learned, we can set the value of an environment variable through the command line by defining the variable's name and value before the actual command. As an example, start Expo development tools and set the environment variable ENV as test like this:

    ENV=test npm start
    
If you take a look at the logs, you should see that the Constants.manifest.extra.env property has changed.

We can also load environment variables from an .env file as we have learned in the previous parts. First, we need to install the Dotenv library:

    npm install dotenv

Next, add a .env file in the root directory of our project with the following content:

    ENV=development

Finally, import the library in the app.config.js file:

    import 'dotenv/config';

    export default {
       name: 'rate-repository-app',
       // rest of the configuration...
       extra: {
         env: process.env.ENV,
       },
    };

You need to restart Expo development tools to apply the changes you have made to the .env file.

## Storing data in the user's device

 In web development, we have used the browser's localStorage object to achieve such functionality. React Native provides similar persistent storage, the AsyncStorage.

We can use the expo install command to install the version of the @react-native-async-storage/async-storage package that is suitable for our Expo SDK version:

    expo install @react-native-async-storage/async-storage
    
The API of the AsyncStorage is in many ways same as the localStorage API. They are both key-value storages with similar methods. The biggest difference between the two is that, as the name implies, the operations of AsyncStorage are asynchronous.

Because AsyncStorage operates with string keys in a global namespace it is a good idea to create a simple abstraction for its operations. This abstraction can be implemented for example using a class. As an example, we could implement a shopping cart storage for storing the products user wants to buy:

    import AsyncStorage from '@react-native-async-storage/async-storage';

    class ShoppingCartStorage {
      constructor(namespace = 'shoppingCart') {
        this.namespace = namespace;
      }

      async getProducts() {
        const rawProducts = await AsyncStorage.getItem(
          `${this.namespace}:products`,
        );

        return rawProducts ? JSON.parse(rawProducts) : [];
      }

      async addProduct(productId) {
        const currentProducts = await this.getProducts();
        const newProducts = [...currentProducts, productId];

        await AsyncStorage.setItem(
          `${this.namespace}:products`,
          JSON.stringify(newProducts),
        );
      }

      async clearProducts() {
        await AsyncStorage.removeItem(`${this.namespace}:products`);
      }
    }

    const doShopping = async () => {
      const shoppingCartA = new ShoppingCartStorage('shoppingCartA');
      const shoppingCartB = new ShoppingCartStorage('shoppingCartB');

      await shoppingCartA.addProduct('chips');
      await shoppingCartA.addProduct('soda');

      await shoppingCartB.addProduct('milk');

      const productsA = await shoppingCartA.getProducts();
      const productsB = await shoppingCartB.getProducts();

      console.log(productsA, productsB);

      await shoppingCartA.clearProducts();
      await shoppingCartB.clearProducts();
    };

    doShopping();

Now that we have implemented storage for storing the user's access token, it is time to start using it. Initialize the storage in the App component:

    import React from 'react';
    import { NativeRouter } from 'react-router-native';
    import { ApolloProvider } from '@apollo/client';

    import Main from './src/components/Main';
    import createApolloClient from './src/utils/apolloClient';
    import AuthStorage from './src/utils/authStorage';

    const authStorage = new AuthStorage();
    const apolloClient = createApolloClient(authStorage);

    const App = () => {
      return (
        <NativeRouter>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </NativeRouter>
      );
    };

    export default App;

We also provided the storage instance for the createApolloClient function as an argument. This is because next, we will send the access token to Apollo Server in each request. The Apollo Server will expect that the access token is present in the Authorization header in the format Bearer <ACCESS_TOKEN>. We can enhance the Apollo Client's operation by using the request option. Let's send the access token to the Apollo Server in our Apollo Client by modifying the createApolloClient function in the apolloClient.js file:

    import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
    import Constants from 'expo-constants';
    import { setContext } from '@apollo/client/link/context';

    // You might need to change this depending on how you have configured the Apollo Server's URI
    const { apolloUri } = Constants.manifest.extra;

    const httpLink = createHttpLink({
      uri: apolloUri,
    });

    const createApolloClient = (authStorage) => {
      const authLink = setContext(async (_, { headers }) => {
        try {
          const accessToken = await authStorage.getAccessToken();
          return {
            headers: {
              ...headers,
              authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          };
        } catch (e) {
          console.log(e);
          return {
            headers,
          };
        }
      });
      return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });
    };

    export default createApolloClient;

## React Context for dependency injection

The last piece of the sign-in puzzle is to integrate the storage to the useSignIn hook. To achieve this the hook must be able to access token storage instance we have initialized in the App component. React Context is just the tool we need for the job. Create a directory contexts in the src directory. In that directory create a file AuthStorageContext.js with the following content:

    import { useContext } from 'react'; 

    import AuthStorageContext from '../contexts/AuthStorageContext';

    const useAuthStorage = () => {
      return useContext(AuthStorageContext);
    };

    export default useAuthStorage;

We can use the hook to refactor the useSignIn hook like this:

    // ...
    import useAuthStorage from '../hooks/useAuthStorage';

    const useSignIn = () => {
      const authStorage = useAuthStorage();
      // ...
    };

## Testing React Native applications

 For testing an Expo based React Native application with Jest, Expo provides a set of Jest configuration in a form of jest-expo preset. In order to use ESLint in the Jest's test files, we also need the eslint-plugin-jest plugin for ESLint. Let's get started by installing the packages:

    npm install --save-dev jest jest-expo eslint-plugin-jest
    
To use the jest-expo preset in Jest, we need to add the following Jest configuration to the package.json file along with the test script:

    {
      // ...
      "scripts": {
        // other scripts...
        "test": "jest"
      },
      "jest": {
        "preset": "jest-expo",
        "transform": {
          "^.+\\.jsx?$": "babel-jest"
        },
        "transformIgnorePatterns": [
          "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|react-router-native)"
        ]
      },
      // ...
    }
    
The transform option tells Jest to transform .js and .jsx files with the Babel compiler. The transformIgnorePatterns option is for ignoring certain directories in the node_modules directory while transforming files. This Jest configuration is almost identical to the one proposed in the Expo's documentation.

To use the eslint-plugin-jest plugin in ESLint, we need to include it in the plugins and extensions array in the .eslintrc file:

    {
      "plugins": ["react", "jest"],
      "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
      "parser": "babel-eslint",
      "env": {
        "browser": true
      },
      "rules": {
        "react/prop-types": "off"
      }
    }
    
To see that the setup is working, create a directory __tests__ in the src directory and in the created directory create a file example.js. In that file, add this simple test:

    describe('Example', () => {
      it('works', () => {
        expect(1).toBe(1);
      });
    });

Now, let's run our example test by running npm test. The command's output should indicate that the test located in the src/__tests__/example.js file is passed.

### Testing components

Luckily, there exists a React Native counterpart for this library, which is the React Native Testing Library. This is the library we will be using while testing our React Native application's components. The good news is, that these libraries share a very similar API, so there aren't too many new concepts to learn. In addition to the React Native Testing Library, we need a set of React Native specific Jest matchers such as toHaveTextContent and toHaveProp. These matchers are provided by the jest-native library. Before getting into the details, let's install these packages:

    npm install --save-dev @testing-library/react-native @testing-library/jest-native
    
To be able to use these matchers we need to extend the Jest's expect object. This can be done by using a global setup file. Create a file setupTests.js in the root directory of your project, that is, the same directory where the package.json file is located. In that file add the following line:

    import '@testing-library/jest-native/extend-expect';
    
Next, configure this file as a setup file in the Jest's configuration in the package.json file (note that the <rootDir> in the path is intentional and there is no need to replace it):

    {
      // ...
      "jest": {
        "preset": "jest-expo",
        "transform": {
          "^.+\\.jsx?$": "babel-jest"
        },
        "transformIgnorePatterns": [
          "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|react-router-native)"
        ],
        "setupFilesAfterEnv": ["<rootDir>/setupTests.js"]
      }
      // ...
    }

Here is an example of how to use the queries:

    import React from 'react';
    import { Text, View } from 'react-native';
    import { render } from '@testing-library/react-native';

    const Greeting = ({ name }) => {
      return (
        <View>
          {/* This node is tagged with the testID prop */}
          <Text testID="greetingText">Hello {name}!</Text>
        </View>
      );
    };

    describe('Greeting', () => {
      it('renders a greeting message based on the name prop', () => {
        const { debug, getByTestId } = render(<Greeting name="Kalle" />);

        debug();

        expect(getByTestId('greetingText')).toHaveTextContent('Hello Kalle!');
      });
    });

Here is an example of how to test submitting a simple form:

    import React, { useState } from 'react';
    import { Text, TextInput, Pressable, View } from 'react-native';
    import { render, fireEvent } from '@testing-library/react-native';

    const Form = ({ onSubmit }) => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = () => {
        onSubmit({ username, password });
      };

      return (
        <View>
          <View>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              testID="usernameField"
            />
          </View>
          <View>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              testID="passwordField"
            />
          </View>
          <View>
            <Pressable onPress={handleSubmit} testID="submitButton">
              <Text>Submit</Text>
            </Pressable>
          </View>
        </View>
      );
    };

    describe('Form', () => {
      it('calls function provided by onSubmit prop after pressing the submit button', () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<Form onSubmit={onSubmit} />);

        fireEvent.changeText(getByTestId('usernameField'), 'kalle');
        fireEvent.changeText(getByTestId('passwordField'), 'password');
        fireEvent.press(getByTestId('submitButton'));

        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });

## Cursor-based pagination

When an API returns an ordered list of items from some collection, it usually returns a subset of the whole set of items to reduce the required bandwidth and to decrease the memory usage of the client applications. 

So cursor is just a serialized presentation of an item in an ordered list. Let's have a look at the paginated repositories returned by the repositories query using the following query:

    {
      repositories(first: 2) {
        totalCount
        edges {
          node {
            id
            fullName
            createdAt
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
    
The first argument tells the API to return only the first two repositories. Here's an example of a result of the query:

    {
      "data": {
        "repositories": {
          "totalCount": 10,
          "edges": [
            {
              "node": {
                "id": "zeit.next.js",
                "fullName": "zeit/next.js",
                "createdAt": "2020-05-15T11:59:57.557Z"
              },
              "cursor": "WyJ6ZWl0Lm5leHQuanMiLDE1ODk1NDM5OTc1NTdd"
            },
            {
              "node": {
                "id": "zeit.swr",
                "fullName": "zeit/swr",
                "createdAt": "2020-05-15T11:58:53.867Z"
              },
              "cursor": "WyJ6ZWl0LnN3ciIsMTU4OTU0MzkzMzg2N10="
            }
          ],
          "pageInfo": {
            "endCursor": "WyJ6ZWl0LnN3ciIsMTU4OTU0MzkzMzg2N10=",
            "startCursor": "WyJ6ZWl0Lm5leHQuanMiLDE1ODk1NDM5OTc1NTdd",
            "hasNextPage": true
          }
        }
      }
    }

Let's say that we want to get the next set of items after the last item of the current set, which is the "zeit/swr" repository. We can set the after argument of the query as the value of the endCursor like this:

    {
      repositories(first: 2, after: "WyJ6ZWl0LnN3ciIsMTU4OTU0MzkzMzg2N10=") {
        totalCount
        edges {
          node {
            id
            fullName
            createdAt
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }

### Infinite scrolling

Let's have a look at how this works in practice using the Apollo Client's useQuery hook. Apollo Client has a great [documentation](https://www.apollographql.com/docs/react/pagination/overview/#cursor-based) on implementing the cursor-based pagination. Let's implement infinite scrolling for the reviewed repositories list as an example.

First, we need to know when the user has reached the end of the list. Luckily, the FlatList component has a prop onEndReached, which will call the provided function once the user has scrolled to the last item on the list. You can change how early the onEndReach callback is called using the onEndReachedThreshold prop. Alter the RepositoryList component's FlatList component so that it calls a function once the end of the list is reached:

    export const RepositoryListContainer = ({
      repositories,
      onEndReach,
      /* ... */,
    }) => {
      const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

      return (
        <FlatList
          data={repositoryNodes}
          // ...
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      );
    };

    const RepositoryList = () => {
      // ...

      const { repositories } = useRepositories(/* ... */);

      const onEndReach = () => {
        console.log('You have reached the end of the list');
      };

      return (
        <RepositoryListContainer
          repositories={repositories}
          onEndReach={onEndReach}
          // ...
        />
      );
    };

    export default RepositoryList;


Next, we need to fetch more repositories once the end of the list is reached. This can be achieved using the fetchMore function provided by the useQuery hook. To describe Apollo Client, how to merge the existing repositories in the cache with the next set of repositories, we can use a field policy. In general, field policies can be used to customize the cache behavior during read and write operations with read and merge functions.

Let's add a field policy for the repositories query in the apolloClient.js file:

    import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
    import { setContext } from '@apollo/client/link/context';
    import Constants from 'expo-constants';
    import { relayStylePagination } from '@apollo/client/utilities';

    const { apolloUri } = Constants.manifest.extra;

    const httpLink = createHttpLink({
      uri: apolloUri,
    });

    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
      },
    });

    const createApolloClient = (authStorage) => {
      const authLink = setContext(async (_, { headers }) => {
        try {
          const accessToken = await authStorage.getAccessToken();

          return {
            headers: {
              ...headers,
              authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          };
        } catch (e) {
          console.log(e);

          return {
            headers,
          };
        }
      });

      return new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
      });
    };

    export default createApolloClient;

Next, let's alter the useRepositories hook so that it returns a decorated fetchMore function, which calls the actual fetchMore function with appropriate arguments so that we can fetch the next set of repositories:

    const useRepositories = (variables) => {
      const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        variables,
        // ...
      });

      const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
          return;
        }

        fetchMore({
          variables: {
            after: data.repositories.pageInfo.endCursor,
            ...variables,
          },
        });
      };

      return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result,
      };
    };

The final step is to call the fetchMore function in the onEndReach handler:

    const RepositoryList = () => {
      // ...

      const { repositories, fetchMore } = useRepositories({
        first: 8,
        // ...
      });

      const onEndReach = () => {
        fetchMore();
      };

      return (
        <RepositoryListContainer
          repositories={repositories}
          onEndReach={onEndReach}
          // ...
        />
      );
    };

    export default RepositoryList;

## Additional resources
[https://fullstackopen.com/en/part10/testing_and_extending_our_application#additional-resources](https://fullstackopen.com/en/part10/testing_and_extending_our_application#additional-resources)










