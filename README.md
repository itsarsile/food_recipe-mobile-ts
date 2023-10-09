<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <div align="center">
    <img height="150" src="https://i.postimg.cc/rwvBhjwr/logo.png" alt="Recipe List" border="0"/>
  </div>
  <h3 align="center">Recipe List</h3>
  <p align="center">
    <a href="https://github.com/itsarsile/food_recipe-mobile-ts.git"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</p>
<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#previews">Screenshots</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Developed a dynamic React Native application designed for users to share and discover recipes. Leveraged the versatility of Expo as the primary build tool to streamline app development. Utilized Expo Router to effectively manage file-based page routing and implemented dynamic routes for enhanced navigation experiences. Employed Redux with TypeScript to centralize and manage the application state, ensuring type safety and data consistency across components. Integrated Material Design principles through Native Paper to provide an intuitive and consistent user interface.

### Built With

This app was built with some technologies below:

- [React Native Paper](https://reactnativepaper.com/)
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://typescriptlang.org)
- [Supabase](https://supabase.com)
- [Redux Toolkit Query](https://redux-toolkit.js.org/tutorials/rtk-query)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [NodeJs](https://nodejs.org/en/download/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

Run project locally using Expo App on Android/iOS in app store. You need to configure the [backend](https://github.com/itsarsile/food_recipe_be-ts) before proceeding.

- Clone the repo

```
git clone https://github.com/itsarsile/food_recipe-mobile-ts.git
```

- Go To Folder Repo

```
cd food_recipe-mobile-ts
```

- Install Module

You can use yarn/npm

```
yarn
```

- <a href="#setup-env">Setup .env</a>
- Type ` npm run dev` To Start Website
- Type ` npm run start` To Start Production

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env

Create .env file in your root project folder.

```
EXPO_PUBLIC_SUPABASE_URL=""
```

```
NEXPO_PUBLIC_SUPABASE_KEY=""
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Previews

<p align="center" display=flex>
   
<table>
 
  <tr>
    <td><image src="https://i.ibb.co/4YJ0DXC/login-screen.jpg" alt="Login Page" width=100%></td>
  </tr>
   <tr>
    <td>Login Page</td>
  </tr>
  <tr>
    <td><image src="https://i.ibb.co/x5Pc7S7/home.jpg" alt="landing" width=100%></td>
  </tr>
  <tr>
    <td>Home Page</td>
  </tr>
  <tr>
    <td><image src="https://i.ibb.co/JB0djP7/recipe-details.jpg" width=100%></td>
    <td><image src="https://i.ibb.co/fk2wjpB/add-recipe.jpg" alt="Add Recipe" width=100%/></td>
  </tr>
  <tr>
    <td>Detail Recipe</td>
    <td>Add Recipe</td>
  </tr>
  <tr>
    <td><image src="https://i.ibb.co/87NVrjP/my-recipe.jpg" width=100%></td>
    <td><image src="https://i.ibb.co/Bny1S6C/edit-recipe.jpg" width=100%></td>
  </tr>
  <tr>
    <td>My Recipe</td>
    <td>Edit Recipe</td>
  </tr>
  <tr>
    <td><image src="https://i.ibb.co/tbmZfPC/profile.jpg" width=100%></td>
  </tr>
  <tr>
    <td>Edit Profile</td>
  </tr>
</table>
      
</p>
<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
## License

Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
