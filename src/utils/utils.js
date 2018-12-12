export const formatReactChartData = (formatData) => {
  if (formatData) {
    let {labels, dataSets} = formatData.toJS()
    dataSets.forEach((item, index) => {
      // item.borderColor = '#0086D6'
      if (!item.hasOwnProperty('borderColor') && index === 1) {
        item.borderColor = 'red'
      } else {
        item.borderColor = '#0086D6'
      }
      item.fill = false
    })
    return {labels, datasets: dataSets}
  } else {
    return null
  }
}
