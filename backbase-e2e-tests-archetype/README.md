# Description

This is a stand-alone module for running end-to-end (e2e) Protractor-Jasmine tests through Maven.

# Rationale

These tests are not a part of the Portal module as they are not intended to be run as a part of the build, but independently.
It is done this way to make running on Jenkins easier. Protractor tests require Selenium webdriver manager running
and actual browsers to perform tests, none of which are not normally present on Jenkins, so testing the current build is difficult.
For that reason, this module is meant to be run in its own life-cycle, executing tests on a remote Selenium grid and browsers.

# Project structure

The project is following the Page Object Model design pattern. The folder structure follows as shown below.

```bash
├── root
│   ├── config
│   │   ├── envs
│   │   ├── capabilities
│   │   ├── **other conf files**
│   ├── data
│   ├── e2e
│   │   ├── **spec files**
│   ├── pages
│   │   ├── **page object files**
│   ├── utils
│   │   ├── browser
│   │   │   ├── browser-helper.js
│   │   ├── report
│   │   │   ├── reporter.js
├── package.json
├── pom.xml
├── README.md
```

- The **config** folder contains protractor configuration file and configuration supporting files.
- The **data** folder contains test data files.
- The **e2e** folder contains test (spec) files which can be further categorized in different directories by feature.
- The **pages** folder contains examples of two approaches for defining Page Objects. The **samplePageAsync.js** demonstrates usage of prototype objects while **SamplePageClass.js** demontrates usage of Javascript classes. Choose one approach for consistency.
- The **utils** folder contains common functions designed to perform small chains of events such as wait functions.

  Make file and directory names lowercase. In general, separate words with hyphens, not underscores. Use only standard ASCII alphanumeric characters in file and directory names.

# Usage


Frontend-maven-plugin is configured to download and install node and npm locally ensuring repeatable builds without dependencies on external environment. Using these, it will install the required dependencies and run the test script which triggers protractor.

To run, use the following command:
```sh
$ mvn clean test
```
This command by default will start one Chrome instance and run all feature files.

> **Note:** This approach may generate paths too long for Windows. In that case, use the global node and npm installation. Alternatively, consider enabling path flattening:

```xml
<execution>
    <id>npm flatten</id>
    <phase>generate-resources</phase>
    <goals>
        <goal>npm</goal>
    </goals>
    <configuration>
        <arguments>run flatten</arguments>
    </configuration>
</execution>
```

The local npm installation can optionally be configured to use maven proxies (as specified in ~/.m2/settings.xml) by setting npmInheritsProxyConfigFromMaven to true.



An option to use globally installed node and npm is provided and can be triggered by:
```sh
$ mvn clean test -Dglobal
```
> **Note:** To write and run native async/await test, the node.js version should be greater than or equal to 8.0.


# Configuration


The project contains several configuration files. The executable configuration file is ```protractor-cucumber.conf.js``` which will export a configuration depending on the chosen environment. If environment variable ENV has not been set, then the default configuration will be exported which is in this case base.conf.js. The ```base.conf.js``` contains basic configuration and environment specific configuration files, which are located in ```config/envs/``` directory, if chosen, will extend the basic configuration.

Example:
```sh
$ ENV='test' mvn clean test
```
This command will merge test.conf.js with base.conf.js, where parameters from test.conf.js have precedence over the same parameters in base conf.


In order to run tests in multiple browsers or different emulator devices in parallel, the ```multicapabilities``` module can be used, located in ```config/capabilities```.

Using ```buildMultiCapabilites``` property, the multicapabilities array can be built dynamically using environment variables.

Example:
```sh
$ BROWSER='chrome,firefox' DEVICE='iPhone 7' mvn clean test
```
This command will start in parallel one Chrome instance, one Firefox instance and one Chrome emulated iPhone 7 device instance.
If none of the parameters have been passed in environment variables, then one Chrome instance will start by default.

If you prefer to have predefined multicapabilities array, then ```getMyMulticapabilities``` property can be used with common capabilities.

#Test results reporting

The Allure reports will be generated in the ```target/site``` folder, in HTML format. Test results are organised per test suite and they contain screenshots.
