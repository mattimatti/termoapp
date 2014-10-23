# Termofacile Mobile Application

## What is it?

This application hast the goal to permit disconnected users to fill some forms with data.
Once connected back to a network syncronize the project with online cms.

## Installation/Running

### Other Dependencies
 * For iOS releases, [XCode](https://developer.apple.com/xcode/), and the Xcode Command Line Tools (Google for loads instructions on installing these)
 * For Android releases, [The Android SDK](http://developer.android.com/sdk/index.html)
 * [NodeJS](http://nodejs.org/)
 
With these, you should be able to run the following commands to get the included sample project up and running.

### Running on a device or simulator

Installing node/bower dependencies (both locally and globally for node):

```
sudo npm install -g grunt
sudo npm install -g cordova
sudo npm install -g ios-sim
npm install 
bower install
```


### Install ANT (for android)
http://wiki.eclipse.org/Ant/User_Guide
```
nano ~/.bash_profile

# append those lines

export ANDROID_HOME=/<installation location>/android-sdk-macosx
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools


source ~/.bash_profile

#install ant
xcode-select --install
brew update
brew install ant


```

Getting your app ready for compilation:

```
grunt build
```

Running your tests:

```
grunt test
```

Adding your ios or android platforms:

```
cordova platforms add ios
cordova platforms add android
```

Building your application for ios or android:

```
cordova build ios
cordova build android
```

Running your app in an ios or android simulator:

``` 
cordova emulate ios
cordova emulate android
```

Running your app on a physical device:

```
cordova run ios
cordova run android
```

## Working on your application

### Automating your workflow with grunt tasks

When making an application from this template, you'll largely be editing source in the `assets` folder, which will then be automatically compiled/converted into relevant JavaScript and CSS for running. In order to automate this process and streamline your workflow, there are some helpful grunt tasks included:

```
grunt watch
```
This will watch the assets folder for code changes, and convert/copy your coffeescript, less and images on the fly.

```
grunt server
```
Runs a HTTP server on port 5000 to server up what's in your `www` folder. You can run your app in-browser at `http://localhost:5000`, or run your tests at `http://localhost:5000/js/spec`.

With these two tasks running, code changes you make in `assets` are ready to view in a matter of seconds, meaning you don't have to manually re-compile or re-deploy to a device to view your work.

### Running your tests

The default template includes a couple of very basic Mocha/Chai/Sinon tests to get you going, you'll find these in `assets/javascripts/spec`, and they can be run with the `grunt test` command. When adding new test files, be sure to include them in `assets/javascripts/spec/app_spec.coffee` or they will not be run. 

Your tests are converted from coffeescript to javascript the same way your application code is, so be sure to keep your `grunt watch` task running while working on them, or run `grunt build` before you run them each time to see changes. 

With `grunt server` running, you can also access your tests at `http://localhost:5000/js/spec`.


### Adding new libraries

You can add new libraries and modules to use in your project via `bower` or `node`. E.g:

```
bower install my-desired-module --save
npm install my-desired-module --save
```

Use `bower` for libraries and modules you want to be available in your application, these are installed into the `components` directory. Use `node` for ones you want as part of your development workflow (this includes running tests), these are installed into the `node_modules` directory.

For any bower components you want to use in your project, you'll need to configure them for use with requirejs, to do this. Add them to your `assets/javascripts/app/require_config.coffee` file. If you're struggling with this, [read up on how requirejs works](http://requirejs.org/).

