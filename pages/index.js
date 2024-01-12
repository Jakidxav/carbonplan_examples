import { useCallback, useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer, Select } from '@carbonplan/components'
import { Map, Fill, Line } from '@carbonplan/maps'

import TavgRaster from '../components/tavg-raster'
import PrecipRaster from '../components/precip-raster'

const Index = () => {
  const { theme } = useThemeUI()
  const [variable, setVariable] = useState('tavg')

  const sx = {
    label: {
      fontFamily: 'mono',
      letterSpacing: 'mono',
      textTransform: 'uppercase',
      fontSize: [1, 1, 1, 2],
      mt: [3],
    },
  }

  const handleVariableChange = useCallback((event) => {
    const variable = event.target.value
    setVariable(variable)
    RasterChanger(variable)
  })

  const RasterChanger = (props) => {
    let { variable } = props
    switch (variable) {
      case "tavg": 
        return <TavgRaster />
      case "prec": 
        return <PrecipRaster />
    }
  }

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
          <RasterChanger variable = { variable } />
        </Map>
                
        <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Box sx={{ ...sx.label, mt: [0] }}>Variable</Box>
          <Select
            sxSelect={{ bg: 'transparent' }}
            size='xs'
            onChange={ handleVariableChange }
            sx={{ mt: [1] }}
            value={ variable }
          >
            <option value='tavg'>Temperature</option>
            <option value='prec'>Precipitation</option>
          </Select>
        </Box>

        <Dimmer
          sx={{
            display: ['initial', 'initial', 'initial', 'initial'],
            position: 'absolute',
            color: 'primary',
            right: [13],
            bottom: [17, 17, 15, 15],
          }}
        />
      </Box>
    </>
  )
}

export default Index
