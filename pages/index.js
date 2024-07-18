import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer } from '@carbonplan/components'
import { Map, Fill, Line, Raster, RegionPicker } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'

import ParameterControls from '../components/parameter-controls'
import RegionControls from '../components/region-controls'
import Ruler from '../components/ruler'
// import MouseTracker from '../components/mouse-tracker'

const Index = () => {
  const { theme } = useThemeUI()

  const [variable, setVariable] = useState('tavg')
  const [month, setMonth] = useState(1)
  const [display, setDisplay] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [colormapName, setColormapName] = useState('warm')
  const colormap = useThemedColormap(colormapName)
  const [clim, setClim] = useState([-20, 30])
  const [showRegionPicker, setShowRegionPicker] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })
  const [regionLoadingData, setRegionDataLoading] = useState(true)
  const mapReference = useRef(null)

  const getters = {
    display,
    opacity,
    variable,
    clim,
    colormapName,
    month,
  };

  const setters = {
    setDisplay,
    setOpacity,
    setVariable,
    setClim,
    setColormapName,
    setMonth,
  };

  useEffect(() => {
    if (!mapReference.current) return
    const mapContainer = new mapboxgl.Map({
      container: mapReference.current,
      attributionControl: false,
      zoom: 2,
    })
    mapReference.current = mapContainer

    mapReference.current.on('load', () => {
      setReady(true)
    })

    return function cleanup() {
      mapReference.current = null
      setReady(null)
    }
  }, [])

  const handleRegionData = useCallback(
    (data) => {
      if (data.value === null) {
        setRegionDataLoading(true)
      } else if (data.value[variable]) {
        // console.log(data)
        setRegionData(data.value)
        setRegionDataLoading(false)
      }
    },
    [setRegionData, setRegionDataLoading]
  )

  return (
    <>
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
        <Map style={{ width: '100%', height: '100%', }} ref={mapReference} zoom={2} center={[0, 0]} >

          <Fill
            color={theme.rawColors.background}
            source={'https://carbonplan-maps.s3.us-west-2.amazonaws.com/basemaps/ocean'}
            variable={'ocean'}
          />

          <Line
            color={theme.rawColors.primary}
            source={'https://carbonplan-maps.s3.us-west-2.amazonaws.com/basemaps/land'}
            variable={'land'}
          />

          {showRegionPicker && (
            <RegionPicker
              color={theme.colors.primary}
              backgroundColor="transparent"
              fontFamily={theme.fonts.mono}
              fontSize={'14px'}
              initialRadius={400}
              maxRadius={2000}
            />
          )
          }

          <Raster
            id={'raster-layer'}
            key={variable}
            // key={`${variable}-${month}`}
            display={display}
            opacity={opacity}
            // source={
            //   variable == 'tavg' ? `https://storage.googleapis.com/carbonplan-maps/v2/demo/2d/${variable}` :
            //     `https://storage.googleapis.com/carbonplan-share/maps-demo/2d/${variable}-regrid`
            // }
            source={'https://storage.googleapis.com/carbonplan-maps/v2/demo/3d/tavg-month'}
            variable={variable}
            clim={clim}
            colormap={colormap}
            mode={"texture"}
            dimensions={['month', 'y', 'x']}
            // setRegionData={setRegionData}
            // selector={{ month: [1, 2, 3, 4,] }}
            selector={{ month }}
            // selector={{month: 2}}
            // frag={`
            //   float rescaled = (month_2 - clim.x)/(clim.y - clim.x);
            //   gl_FragColor = texture2D(colormap, vec2(rescaled, 1.0));
            //   `}
            // regionOptions={{ setData: setRegionData, selector: { month: [1, 2, 3, 4] } }}
          regionOptions={{ setData: handleRegionData, selector: {} }}
          />
 
          <RegionControls
            variable={variable}
            month={month}
            regionData={regionData}
            showRegionPicker={showRegionPicker}
            setShowRegionPicker={setShowRegionPicker}
          />

          <ParameterControls getters={getters} setters={setters} />

          <Ruler />

          {/* <MouseTracker /> */}

        </Map>

        <Dimmer
          sx={{
            display: ['initial', 'initial', 'initial', 'initial'],
            position: 'absolute',
            color: 'primary',
            right: [35],
            bottom: [28, 28, 26, 26],
          }}
        />

      </Box>
    </>
  )
}

export default Index