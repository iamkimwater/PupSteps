# PupSteps

### 1. Setting up the development environment
- Development OS: Windows
- Target OS: Android

```terminal
npx react-native@latest init PupSteps
```

```terminal
git init
git add .
git commit -m "initial commit"
git branch -M dev
git remote add origin https://github.com/iamkimwater/PupSteps.git
git push -u origin dev    
```

```
npm run android
```
### 2. Change android package name : com.iamkimwater.pupsteps

#### < fixed file list >
- android/app/build.gradle
- android/app/src/debug/java/com/pupsteps/ReactNativeFlipper.java
- android/app/src/main/java/com/pupsteps/MainActivity.java
- android/app/src/main/java/com/pupsteps/MainApplication.java
- android/app/src/release/java/com/pupsteps/ReactNativeFlipper.java

### 3. Setting up build types

#### < fixed file list >
- android/app/build.gradle
- android/app/src/main/AndroidManifest.xml
- android/app/src/main/res/values/strings.xml
- android/gradle.properties
- android/app/proguard-rules.pro
- .gitignore
- package.json

#### < added file list >
- .env.dev
- .env.alpha
- .env.beta
- .env.prod

```terminal
# for signing, Generating an upload key
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 4. Setting up the Fastlane

1) Install the Ruby : [Rubyinstallers](https://rubyinstaller.org/downloads/)
2) Install the Bundler
```terminal
gem install bundler
```
3) Create ./Gemfile in the root directory of your project with the content
```
source "https://rubygems.org"

gem "fastlane"
```
4) Update Bundler
```
bundle update
```
5) Install fastlane, fastlane init
```
# System
gem install fastlane

# Project Root Directory
bundle exec fastlane init --platform android

# fastlane init은 시스템 전체에 설치된 fastlane 버전 사용
# bundler exec는 Bundler가 관리하는 gem 환경 내에서 명령 실행
# 프로젝트의 Gemfile에 지정된 버전의 fastlane 버전 사용
```
 
### 5. Create files in fastlane directory
ios 프로젝트가 없는 상태이므로 파일 직접 생성

#### < added file list >
- Appfile
- Fastfile (ios 관련 레인 삭제)
- Pluginfile

### 6. Change versionName : 0.0.1

#### < fixed file list >
- android/app/build.gradle

### 7. Setting for Codepush
1) Add the SDK to the project
```
npm install appcenter appcenter-analytics appcenter-crashes --save-exact
```
2) Integrate the SDK
