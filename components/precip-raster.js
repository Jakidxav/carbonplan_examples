import { useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Raster, RegionPicker } from '@carbonplan/maps'
import ParameterControls from './parameter-controls'
import RegionControls from './region-controls'

const PrecipRaster = () => {

    const { theme } = useThemeUI()

    const [display, setDisplay] = useState(true)
    const [opacity, setOpacity] = useState(1)
    const [variable, setVariable] = useState('prec')
    const [colormapName, setColormapName] = useState('cool')
    const colormap = useThemedColormap(colormapName)
    const [clim, setClim] = useState([0, 300])
    // const [month, setMonth] = useState(1)
    const [showRegionPicker, setShowRegionPicker] = useState(false)
    const [regionData, setRegionData] = useState({ loading: true })

    const getters = { display, opacity, variable, clim, colormapName, };
    const setters = { setDisplay, setOpacity, setVariable, setClim, setColormapName, };

    return (
    <>
        {showRegionPicker && (
            <RegionPicker
              color={ theme.colors.primary }
              backgroundColor="transparent"
              fontFamily={ theme.fonts.mono }
              fontSize={ '14px' }
              initialRadius={ 400 }
              maxRadius={ 2000 }
            />
          )
        }
        <Raster
            display={ display }
            opacity={ opacity }
            source={ 'https://storage.googleapis.com/carbonplan-share/maps-demo/2d/prec-regrid' }
            variable={ variable }
            clim={ clim }
            colormap={ colormap }
            mode={ "texture" }
            regionOptions={{ setData: setRegionData }}
        />
        <RegionControls
            variable={ variable }
            regionData={ regionData }
            showRegionPicker={ showRegionPicker }
            setShowRegionPicker={ setShowRegionPicker }
        />
        <ParameterControls getters={getters} setters={setters} />
    </>
    )
}

export default PrecipRaster;