// import { useState, useRef, useEffect } from "react"

// const MapComponent = () => {
//   const ref = useRef(null)
//   const [map, setMap] = useState()
//   useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}))
//     }
//   }, [ref, map])
//   return <div ref={ref}></div>
// }
// export default MapComponent

// // [START maps_react_map]
// import * as React from "react"
// import { createRoot } from "react-dom/client"
// import { Wrapper, google } from "@googlemaps/react-wrapper"
// import { createCustomEqual } from "fast-equals"
// import { isLatLngLiteral } from "@googlemaps/typescript-guards"
// // import { useState, useRef, useEffect } from "react"
// // import { google } from "@react-google-maps/api"
// const render = (status) => {
//   return <h1>{status}</h1>
// }
// const MapComponent = () => {
//   // [START maps_react_map_component_app_state]
//   const [clicks, setClicks] = React.useState([])
//   const [zoom, setZoom] = React.useState(3) // initial zoom
//   const [center, setCenter] = React.useState({
//     lat: 0,
//     lng: 0,
//   })
//   const onClick = (e) => {
//     // avoid directly mutating state
//     setClicks([...clicks, e.latLng])
//   }
//   const onIdle = (m) => {
//     console.log("onIdle")
//     setZoom(m.getZoom())
//     setCenter(m.getCenter().toJSON())
//   }
//   // [END maps_react_map_component_app_state]
//   const form = (
//     <div
//       style={{
//         padding: "1rem",
//         flexBasis: "250px",
//         height: "100%",
//         overflow: "auto",
//       }}
//     >
//       <label htmlFor="zoom">Zoom</label>
//       <input type="number" id="zoom" name="zoom" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
//       <br />
//       <label htmlFor="lat">Latitude</label>
//       <input type="number" id="lat" name="lat" value={center.lat} onChange={(event) => setCenter({ ...center, lat: Number(event.target.value) })} />
//       <br />
//       <label htmlFor="lng">Longitude</label>
//       <input type="number" id="lng" name="lng" value={center.lng} onChange={(event) => setCenter({ ...center, lng: Number(event.target.value) })} />
//       <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
//       {clicks.map((latLng, i) => (
//         <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
//       ))}
//       <button onClick={() => setClicks([])}>Clear</button>
//     </div>
//   )
//   // [START maps_react_map_component_app_return]
//   return (
//     <div style={{ display: "flex", height: "100%" }}>
//       <Wrapper apiKey={process.env.React_APP_GOOGLE_KEY} render={render}>
//         <Map center={center} onClick={onClick} onIdle={onIdle} zoom={zoom} style={{ flexGrow: "1", height: "100%" }}>
//           {clicks.map((latLng, i) => (
//             <Marker key={i} position={latLng} />
//           ))}
//         </Map>
//       </Wrapper>
//       {/* Basic form for controlling center and zoom of map. */}
//       {form}
//     </div>
//   )
//   // [END maps_react_map_component_app_return]
// }
// const Map = ({ onClick, onIdle, children, style, ...options }) => {
//   // [START maps_react_map_component_add_map_hooks]
//   const ref = React.useRef(null)
//   const [map, setMap] = React.useState()
//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}))
//     }
//   }, [ref, map])
//   // [END maps_react_map_component_add_map_hooks]
//   // [START maps_react_map_component_options_hook]
//   // because React does not do deep comparisons, a custom hook is used
//   // see discussion in https://github.com/googlemaps/js-samples/issues/946
//   useDeepCompareEffectForMaps(() => {
//     if (map) {
//       map.setOptions(options)
//     }
//   }, [map, options])
//   // [END maps_react_map_component_options_hook]
//   // [START maps_react_map_component_event_hooks]
//   React.useEffect(() => {
//     if (map) {
//       ;["click", "idle"].forEach((eventName) => google.maps.event.clearListeners(map, eventName))
//       if (onClick) {
//         map.addListener("click", onClick)
//       }
//       if (onIdle) {
//         map.addListener("idle", () => onIdle(map))
//       }
//     }
//   }, [map, onClick, onIdle])
//   // [END maps_react_map_component_event_hooks]
//   // [START maps_react_map_component_return]
//   return (
//     <>
//       <div ref={ref} style={style} />
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           // set the map prop on the child component
//           return React.cloneElement(child, { map })
//         }
//       })}
//     </>
//   )
//   // [END maps_react_map_component_return]
// }
// // [START maps_react_map_marker_component]
// const Marker = (options) => {
//   const [marker, setMarker] = React.useState()
//   React.useEffect(() => {
//     if (!marker) {
//       setMarker(new google.maps.Marker())
//     }
//     // remove marker from map on unmount
//     return () => {
//       if (marker) {
//         marker.setMap(null)
//       }
//     }
//   }, [marker])
//   React.useEffect(() => {
//     if (marker) {
//       marker.setOptions(options)
//     }
//   }, [marker, options])
//   return null
// }
// // [END maps_react_map_marker_component]
// const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
//   if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
//     return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
//   }
//   // TODO extend to other types
//   // use fast-equals for other objects
//   return deepEqual(a, b)
// })
// function useDeepCompareMemoize(value) {
//   const ref = React.useRef()
//   if (!deepCompareEqualsForMaps(value, ref.current)) {
//     ref.current = value
//   }
//   return ref.current
// }
// function useDeepCompareEffectForMaps(callback, dependencies) {
//   React.useEffect(callback, dependencies.map(useDeepCompareMemoize), [])
// }
// window.addEventListener("DOMContentLoaded", () => {
//   const root = createRoot(document.getElementById("root"))
//   root.render(<MapComponent />)
// })

// export default MapComponent
// [END maps_react_map]

// const MapComponent = () => {
//   var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")

//   mapboxgl.accessToken = "pk.eyJ1IjoicG9sb2RlbGV2YXMiLCJhIjoiY2w0c2c3YWVtMGFsODNpcXE0dnQyeWFqaCJ9.l6LDinYwzrg5Gqmdnz3pBA" // generic try token
//   var map = new mapboxgl.Map({
//     container: "mycontainer",
//     style: "mapbox://styles/mapbox/streets-v11",
//   })
//   return <div id="mycontainer"></div>
// }
// export default MapComponent
import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax

const MapComponent = () => {
  const mapContainer = useRef(null)
  // const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)
  const [MaxBounds, setMaxBounds] = useState([])

  // useEffect(() => {
  //   if (map.current) return // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   })
  // })
  // useEffect(() => {
  //   if (!map.current) return // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4))
  //     setLat(map.current.getCenter().lat.toFixed(4))
  //     setZoom(map.current.getZoom().toFixed(2))
  //   })
  // })

  /////////above is just the map. below is routes
  mapboxgl.accessToken = "pk.eyJ1IjoicG9sb2RlbGV2YXMiLCJhIjoiY2w0c2c3YWVtMGFsODNpcXE0dnQyeWFqaCJ9.l6LDinYwzrg5Gqmdnz3pBA"

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-122.662323, 45.523751], // starting position
    zoom: 12,
  })
  // set the bounds of the map
  const bounds = [
    [-123.069003, 45.395273],
    [-122.303707, 45.612333],
  ]
  map.setMaxBounds(bounds)

  // an arbitrary start will always be the same
  // only the end or destination will change
  const start = [-122.662323, 45.523751]

  // this is where the code for the next step will go

  // create a function to make a directions request
  async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    )
    const json = await query.json()
    const data = json.routes[0]
    const route = data.geometry.coordinates
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    }
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson)
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      })
    }
    // add turn instructions here at the end
  }

  map.on("load", () => {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start)

    // Add starting point to the map
    map.addLayer({
      id: "point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: start,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#3887be",
      },
    })
    // this is where the code from the next step will go
  })

  map.on("click", (event) => {
    const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key])
    const end = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: coords,
          },
        },
      ],
    }
    if (map.getLayer("end")) {
      map.getSource("end").setData(end)
    } else {
      map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: coords,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#f30",
        },
      })
    }
    getRoute(coords)
  })

  return (
    // <div>
    // <div className="sidebar">
    //Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    //</div>

    <div id="map" className="map-container map"></div>

    // </div>
  )
}
export default MapComponent
