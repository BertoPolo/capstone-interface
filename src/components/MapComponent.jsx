import { useState, useRef, useEffect } from "react"

const MapComponent = () => {
  const ref = useRef(null)
  const [map, setMap] = useState()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  return <div ref={ref}></div>
}

export default MapComponent
