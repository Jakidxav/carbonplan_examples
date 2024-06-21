import { useThemeUI } from 'theme-ui'
import { Box } from 'theme-ui'
import { useCallback, useState } from 'react'
import { Badge } from '@carbonplan/components'
import { useMapbox } from '@carbonplan/maps'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1, 1, 1, 2],
    mt: [3],
  }
}

const MouseTracker = () => {
  const { theme } = useThemeUI()
  const { map } = useMapbox()
  const [xy, setXY] = useState([0, 0])
  const [latLon, setLatLon] = useState([0, 0])

  // console.log("Map: ")
  // console.log(map)
  // var layers = map.getStyle().layers;
  // console.log("Layers: ")
  // console.log(layers)
  // console.log()
  
  map.on('mousemove', (e) => {
    setXY([e.point.x, e.point.y])
    setLatLon([e.lngLat.lat, e.lngLat.lng])
  });

  return (
    <>
      <Box sx={{ position: 'absolute', bottom: 250, left: 20 }}>
        <Badge sx={{width:'150px', height:'25px'}}>Lon, Lat coords</Badge>
        <Badge
            sx={{
              bg: 'primary',
              color: 'background',
              display: 'inline-block',
              position: 'relative',
              height: ['21px', '21px', '25px', '23px'],
              left: [3],
              top: [0],
            }}
          >
            { `[${latLon[1].toFixed(2)}, ${latLon[0].toFixed(2)}]` }
        </Badge>
      </Box>

      <Box sx={{ position: 'absolute', bottom: 220, left: 20 }}>
        <Badge sx={{width:'150px', height:'25px'}}>Value at coords</Badge>
        <Badge
            sx={{
              bg: 'primary',
              color: 'background',
              display: 'inline-block',
              position: 'relative',
              height: ['21px', '21px', '25px', '23px'],
              left: [3],
              top: [0],
            }}
          >
            {/* { `[${latLon[1].toFixed(2)}, ${latLon[0].toFixed(2)}]` } */}
        </Badge>
      </Box>
    </>
  )


}

export default MouseTracker