// import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax

// import toGeoJson from "@mapbox/togeojson"
// import { DOMParser } from "xmldom"
// import path from "path"
// import fs from "fs"

// const MapComponent = () => {
// mapboxgl.accessToken = "pk.eyJ1IjoicG9sb2RlbGV2YXMiLCJhIjoiY2w0c2c3YWVtMGFsODNpcXE0dnQyeWFqaCJ9.l6LDinYwzrg5Gqmdnz3pBA"

// const theMap = document.body.appendChild(document.createElement("div"))

// const map = new mapboxgl.Map({
//   container: theMap,
//   style: "mapbox://styles/mapbox/streets-v11",
//   center: [-122.662323, 45.523751], // starting position
//   zoom: 12,
// })
// // set the bounds of the map
// const bounds = [
//   [-123.069003, 45.395273],
//   [-122.303707, 45.612333],
// ]
// map.setMaxBounds(bounds)

// // an arbitrary start will always be the same
// // only the end or destination will change
// const start = [-122.662323, 45.523751]

// // this is where the code for the next step will go

// // create a function to make a directions request
// async function getRoute(end) {
//   // make a directions request using cycling profile
//   // an arbitrary start will always be the same
//   // only the end or destination will change
//   const query = await fetch(
//     `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//     { method: "GET" }
//   )
//   const json = await query.json()
//   const data = json.routes[0]
//   const route = data.geometry.coordinates
//   const geojson = {
//     type: "Feature",
//     properties: {},
//     geometry: {
//       type: "LineString",
//       coordinates: route,
//     },
//   }
//   // if the route already exists on the map, we'll reset it using setData
//   if (map.getSource("route")) {
//     map.getSource("route").setData(geojson)
//   }
//   // otherwise, we'll make a new request
//   else {
//     map.addLayer({
//       id: "route",
//       type: "line",
//       source: {
//         type: "geojson",
//         data: geojson,
//       },
//       layout: {
//         "line-join": "round",
//         "line-cap": "round",
//       },
//       paint: {
//         "line-color": "#3887be",
//         "line-width": 5,
//         "line-opacity": 0.75,
//       },
//     })
//   }
//   // add turn instructions here at the end
// }

// map.on("load", () => {
//   // make an initial directions request that
//   // starts and ends at the same location
//   getRoute(start)

//   // Add starting point to the map
//   map.addLayer({
//     id: "point",
//     type: "circle",
//     source: {
//       type: "geojson",
//       data: {
//         type: "FeatureCollection",
//         features: [
//           {
//             type: "Feature",
//             properties: {},
//             geometry: {
//               type: "Point",
//               coordinates: start,
//             },
//           },
//         ],
//       },
//     },
//     paint: {
//       "circle-radius": 10,
//       "circle-color": "#3887be",
//     },
//   })
//   // this is where the code from the next step will go
// })

// map.on("click", (event) => {
//   const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key])
//   const end = {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "Point",
//           coordinates: coords,
//         },
//       },
//     ],
//   }
//   if (map.getLayer("end")) {
//     map.getSource("end").setData(end)
//   } else {
//     map.addLayer({
//       id: "end",
//       type: "circle",
//       source: {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [
//             {
//               type: "Feature",
//               properties: {},
//               geometry: {
//                 type: "Point",
//                 coordinates: coords,
//               },
//             },
//           ],
//         },
//       },
//       paint: {
//         "circle-radius": 10,
//         "circle-color": "#f30",
//       },
//     })
//   }
//   getRoute(coords)
// })
//return
////////////////////////////

// }
// export default MapComponent

import { PureComponent } from "react"
import PropTypes from "prop-types"
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"
import MapboxDirections from "mapbox-gl"

const VALID_POSITIONS = ["top-left", "top-right", "bottom-left", "bottom-right"]

class Directions extends PureComponent {
  directions = null

  componentDidMount() {
    this.initializeDirections()
  }
  componentWillUnmount() {
    this.removeDirections()
  }

  componentDidUpdate() {
    this.removeDirections()
    this.initializeDirections()
  }

  initializeDirections = () => {
    const mapboxMap = this.getMapboxMap()
    const {
      mapboxApiAccessToken,
      position,
      styles,
      api,
      interactive,
      profile,
      alternatives,
      congestion,
      unit,
      compile,
      geocoder,
      controls,
      zoom,
      placeholderOrigin,
      placeholderDestination,
      flyTo,
      exclude,
      onInit,
    } = this.props

    const options = {
      accessToken: mapboxApiAccessToken,
      styles,
      api,
      interactive,
      profile,
      alternatives,
      congestion,
      unit,
      geocoder,
      controls,
      zoom,
      placeholderOrigin,
      placeholderDestination,
      flyTo,
      exclude,
    }

    if (compile && typeof compile === "function") {
      options.compile = compile
    }

    this.directions = new MapboxDirections(options)
    this.subscribeEvents()

    mapboxMap.addControl(
      this.directions,
      VALID_POSITIONS.find((_position) => position === _position)
    )

    onInit(this.directions)
  }

  getMapboxMap = () => {
    const { mapRef } = this.props
    return (mapRef && mapRef.current && mapRef.current.getMap()) || null
  }

  subscribeEvents = () => {
    this.directions.on("clear", this.handleClear)
    this.directions.on("loading", this.handleLoading)
    this.directions.on("profile", this.handleProfile)
    this.directions.on("origin", this.handleOrigin)
    this.directions.on("destination", this.handleDestination)
    this.directions.on("route", this.handleRoute)
    this.directions.on("error", this.handleError)
  }
  unsubscribeEvents = () => {
    this.directions.off("clear", this.handleClear)
    this.directions.off("loading", this.handleLoading)
    this.directions.off("profile", this.handleProfile)
    this.directions.off("origin", this.handleOrigin)
    this.directions.off("destination", this.handleDestination)
    this.directions.off("route", this.handleRoute)
    this.directions.off("error", this.handleError)
  }

  removeDirections = () => {
    const mapboxMap = this.getMapboxMap()

    this.unsubscribeEvents()
    if (mapboxMap && mapboxMap.removeControl) {
      this.getMapboxMap().removeControl(this.directions)
    }

    this.directions = null
  }

  handleClear = (event) => {
    this.props.onClear(event)
  }
  handleLoading = (event) => {
    this.props.onLoading(event)
  }
  handleProfile = (event) => {
    this.props.onProfile(event)
  }
  handleOrigin = (event) => {
    this.props.onOrigin(event)
  }
  handleDestination = (event) => {
    this.props.onDestination(event)
  }
  handleRoute = (event) => {
    this.props.onRoute(event)
  }
  handleError = (event) => {
    this.props.onError(event)
  }

  render() {
    return null
  }

  static propTypes = {
    mapRef: PropTypes.object.isRequired,
    mapboxApiAccessToken: PropTypes.string.isRequired,
    position: PropTypes.oneOf(VALID_POSITIONS),
    styles: PropTypes.array,
    api: PropTypes.string,
    interactive: PropTypes.bool,
    profile: PropTypes.string,
    alternatives: PropTypes.bool,
    congestion: PropTypes.bool,
    unit: PropTypes.string,
    compile: PropTypes.func,
    geocoder: PropTypes.object,
    controls: PropTypes.object,
    zoom: PropTypes.number,
    placeholderOrigin: PropTypes.string,
    placeholderDestination: PropTypes.string,
    flyTo: PropTypes.bool,
    exclude: PropTypes.bool,
    onInit: PropTypes.func,
    onClear: PropTypes.func,
    onLoading: PropTypes.func,
    onOrigin: PropTypes.func,
    onProfile: PropTypes.func,
    onDestination: PropTypes.func,
    onRoute: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    position: "top-right",
    zoom: 16,
    api: "https://api.mapbox.com/directions/v5/",
    profile: "mapbox/driving-traffic",
    onInit: () => {},
    onClear: () => {},
    onLoading: () => {},
    onOrigin: () => {},
    onProfile: () => {},
    onDestination: () => {},
    onRoute: () => {},
    onError: () => {},
  }
}
export default Directions
