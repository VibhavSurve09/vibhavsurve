# [vibhavsurve.tech](https://vibhavsurve.tech/)

This is my personal website. Here I keep myself updated with whatever projects, techs that I use and add resources for everybody else to refer.

The application is built with Nextjs

## Overview

#### Get Projects

```http
  GET /projects
```

Lists all the projects that I have done in past or any upcoming projects.

#### Get Resume

```http
  GET /resume
```

Displays the internships that I have done and skills with what depth I know are shown.

## Run Locally

Clone the project

```bash
  git clone https://github.com/VibhavSurve09/vibhavsurve.git
```

Go to the project directory

```bash
  cd vibhavsurve
```

Install dependencies

```bash
  npm install
  or
  yarn
```

Start the server

```bash
  npm run dev
  or
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Refrence shown in .env.example

`URI=`

`DB_USER=`

`PASSWORD=`

## Tech Stack

**Client:** Nextjs, TailwindCSS

**Database:** Neo4j

**Web Server:** Nginx

Special Thanks to [Backbench Coder](https://youtu.be/atebfXxl9B4) for such amazing front-end tutorial.

## Optimizations

- Have used Server-side Rendering wherever possible thus making sure to get good Lighthouse score.

- Uses HTTP/2 under the hood to reduce the number of TCP connections.

![HTTP/2](https://user-images.githubusercontent.com/73296863/151298316-f8181c03-ea82-40f1-aa94-c19a6eaeeb74.png)

<img src="https://c.tenor.com/V6B8eapBp6kAAAAC/little-girl-smile.gif" height="200" width="200">

## Feedback

If you have any feedback, please reach out to me at survevibhav09@gmail.com

## Support

Feel free to use it and if you like this don't forget to give a 🌟

Thanks!
