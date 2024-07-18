import { useMemo } from 'react'
import { Box, IconButton } from 'theme-ui'
import { useRecenterRegion } from '@carbonplan/maps'
import { XCircle } from '@carbonplan/icons'

const AverageDisplay = ({ variable, month, data }) => {
  if (!data || !data[variable]) {
      return 'loading...'
  }
  
  let result

  const chartData = useMemo(() => {
    let lineData = []
    if (!data) return []
    data.coordinates.month.forEach((m) => {
      let filteredData = data[variable][m].filter((d) => d !== 9.969209968386869e36)
      const average = filteredData.reduce((a, b) => a + b, 0) / filteredData.length
      lineData.push([m, average])
    })
    return lineData
  }, [data])

  let avg = chartData[month - 1][1]
  if (isNaN(avg)) {
    result = 'no data in region'
  } else {
    result = `Average: ${avg.toFixed(2)}ºC`
  }


  console.log("Region data: ", data)
  console.log("Chart data: ", chartData)
  console.log()

  return (
    <Box
      sx={{
        ml: [2],
        mt: ['-1px'],
        fontFamily: 'mono',
        letterSpacing: 'mono',
        textTransform: 'uppercase',
      }}
    >
      {result}
    </Box>
  )
}

const RegionControls = ({
  variable,
  regionData,
  month,
  showRegionPicker,
  setShowRegionPicker,
}) => {
  const { recenterRegion } = useRecenterRegion()

  return (
    <Box
      sx={{
        display: ['none', 'none', 'flex', 'flex'],
        alignItems: 'center',
        position: 'absolute',
        color: 'primary',
        left: [13],
        bottom: [30, 30, 28, 28],
      }}
    >
      <IconButton
        aria-label='Circle filter'
        onClick={() => setShowRegionPicker(!showRegionPicker)}
        sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
      >
        {!showRegionPicker && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='10' cy='10' r='3' />
            <line x1='12' x2='17' y1='12' y2='17' />
          </svg>
        )}
        {showRegionPicker && (
          <XCircle sx={{ strokeWidth: 1.75, width: 24, height: 24 }} />
        )}
      </IconButton>
      {showRegionPicker && (
        <IconButton
          aria-label='Recenter map'
          onClick={recenterRegion}
          sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='12' cy='12' r='2' />
          </svg>
        </IconButton>
      )}
      {showRegionPicker && (
        <AverageDisplay data={regionData} month={month} variable={variable} />
      )}
    </Box>
  )
}

export default RegionControls