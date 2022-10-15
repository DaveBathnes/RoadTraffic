# Road traffic data

This is a sample visualisation using the department for transport road traffic API.

### Prerequisites

The following software is a pre-requisite for building and deploying this web application.

* [Node.js](https://nodejs.org/en/) - JavaScript runtime


### Installing

A step by step series of examples that tell you how to get a development env running

Install the dependencies

```console
npm install
```

Start the application

```console
npm start
```

### Build and deploy

The application is set up to use gh-pages npm module to deploy the built application to a GitHub pages branch.

```console
npm run build
npm run deploy
```

### Built With

* [React JS](https://reactjs.org/) - The web framework used
* [Mapbox GL](https://www.mapbox.com) - The web map framework
* [Chart JS](https://www.chartjs.org/) - The charting framework

### Instructions

#### Navigate to the home page

See [Road Traffic](https://davebathnes.github.io/RoadTraffic/) (the URL is case sensitive).

1. Choose a year and an authority to view data for.
2. Click 'Refresh Data'. After a moment the map will pan to the relevant authority area. Circles on the map will display the traffic count points, sized relative to the count of all vehicle average traffic counts.
3. A graph should also appear in the sidebar, showing the relative amounts of 4 traffic types.
4. On changing the two options (year and authority) and selecting refresh data the view should update.
5. The map circles can also be selected to show a popup of information about the individual count point.

![Screenshot of web application](https://raw.githubusercontent.com/DaveBathnes/RoadTraffic/master/screenshot.png)

### Authors

* **Dave Rowe** - *Initial work* - [DaveBathnes](https://github.com/DaveBathnes)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

### Acknowledgments

- Department for transport data sources.
