import { useCallback } from 'react'
import { Box, Flex } from 'theme-ui'
import { Slider, Badge, Toggle, Select, Link } from '@carbonplan/components'
import { colormaps } from '@carbonplan/colormaps'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1, 1, 1, 2],
    mt: [3],
  },
}

const CLIM_RANGES = {
  tavg: { max: 30, min: -20 },
  prec: { max: 300, min: 0 },
}

const DEFAULT_COLORMAPS = {
  tavg: 'warm',
  prec: 'cool',
}

const ParameterControls = ({ getters, setters }) => {
  const {
    display,
    opacity,
    variable,
    clim,
    colormapName
  } = getters

  const {
    setDisplay,
    setOpacity,
    setVariable,
    setClim,
    setColormapName,
  } = setters

  const handleVariableChange = useCallback((event) => {
    const variable = event.target.value
    setVariable(variable)
    setClim([CLIM_RANGES[variable].min, CLIM_RANGES[variable].max])
    setColormapName(DEFAULT_COLORMAPS[variable])
  })

  return (
    <>
      <Box sx={{ position: 'absolute', top: 30, right: 40 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4,
          }}
        >

          <Box>
            <Box sx={{ ...sx.label, mt: [0] }}>Display</Box>
            <Toggle
              sx={{ display: 'block', float: 'right', mt: [2] }}
              value={display}
              onClick={() => setDisplay((prev) => !prev)}
            />
          </Box>
        </Flex>
      </Box>

      <Box sx={{ position: 'absolute', top: 30, left: 20 }}>
        <Box sx={{ ...sx.label, mt: [4] }}>Variable</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleVariableChange}
          sx={{ mt: [1] }}
          value={variable}
        >
          <option value='tavg'>Temperature</option>
          <option value='prec'>Precipitation</option>
        </Select>

        {/* <Box sx={{ ...sx.label, mt: [4] }}>Month</Box>
        <Slider
          min={1}
          max={12}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={month}
          onChange={(e) => setMonth(parseFloat(e.target.value))}
        />
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            position: 'relative',
            left: [3],
            top: [1],
          }}
        >
          {month.toFixed(0)}
        </Badge> */}

        {/* <Box sx={{ ...sx.label, mt: [4] }}>Opacity</Box>
        <Slider
          min={0}
          max={1}
          step={0.01}
          sx={{ width: '175px', display: 'inline-block' }}
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            fontSize: [1, 1, 1, 2],
            height: ['21px', '21px', '21px', '23px'],
            position: 'relative',
            left: [3],
            top: ['3px'],
          }}
        >
          {opacity.toFixed(2)}
        </Badge> */}

        <Box sx={{...sx.label, mt: [4]}}>Minimum</Box>
        <Slider
          min={CLIM_RANGES[variable].min}
          max={CLIM_RANGES[variable].max}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={clim[0]}
          onChange={(e) =>
            setClim((prev) => [parseFloat(e.target.value), prev[1]])
          }
        />
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            position: 'relative',
            left: [3],
            top: [1],
          }}
        >
          {clim[0].toFixed(0)}
        </Badge>

        <Box sx={sx.label}>Maximum</Box>
        <Slider
          min={CLIM_RANGES[variable].min}
          max={CLIM_RANGES[variable].max}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={clim[1]}
          onChange={(e) =>
            setClim((prev) => [prev[0], parseFloat(e.target.value)])
          }
        />
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            position: 'relative',
            left: [3],
            top: [1],
          }}
        >
          {clim[1].toFixed(0)}
        </Badge>

        <Box sx={{ ...sx.label, mt: [2] }}>Colormap</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={(e) => setColormapName(e.target.value)}
          sx={{ mt: [1] }}
          value={colormapName}
        >
          {colormaps.map((d) => (
            <option key={d.name}>{d.name}</option>
          ))}
        </Select>
      </Box>
    </>
  )
}

export default ParameterControls