import { useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer } from '@carbonplan/components'
import { Map, Fill, Line, Raster, RegionPicker } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'

import ParameterControls from '../components/parameter-controls'
import RegionControls from '../components/region-controls'
import Ruler from '../components/ruler'
import MouseTracker from '../components/mouse-tracker'

const Index = () => {
  const { theme } = useThemeUI()

  const [variable, setVariable] = useState('tavg')
  const [display, setDisplay] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [colormapName, setColormapName] = useState('warm')
  const colormap = useThemedColormap(colormapName)
  const [clim, setClim] = useState([-20, 30])
  const [showRegionPicker, setShowRegionPicker] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })

  const getters = {
    display,
    opacity,
    variable,
    clim,
    colormapName,
  };

  const setters = {
    setDisplay,
    setOpacity,
    setVariable,
    setClim,
    setColormapName,
  };

  return (
    <>
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
        <Map zoom={2} center={[0, 0]}>
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
            key={variable}
            display={display}
            opacity={opacity}
            source={
              variable == 'tavg' ? `https://storage.googleapis.com/carbonplan-maps/v2/demo/2d/${variable}` :
                `https://storage.googleapis.com/carbonplan-share/maps-demo/2d/${variable}-regrid`
            }
            variable={variable}
            clim={clim}
            colormap={colormap}
            mode={"texture"}
            regionOptions={{ setData: setRegionData }}
          />

          <RegionControls
            variable={variable}
            regionData={regionData}
            showRegionPicker={showRegionPicker}
            setShowRegionPicker={setShowRegionPicker}
          />

          <ParameterControls getters={getters} setters={setters} />

          <Ruler />

          <MouseTracker />

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
