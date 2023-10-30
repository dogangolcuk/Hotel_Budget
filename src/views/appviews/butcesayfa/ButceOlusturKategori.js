import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import 'react-pivottable/pivottable.css'
import { getDataByRoute } from '../../../util'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import createPlotlyRenderer from 'react-pivottable/PlotlyRenderers'
import TableRenderers from 'react-pivottable/TableRenderers'

const ButceOlusturKategori = () => {
  const [widgetData, setWidgetData] = useState([])
  const [settings, setSettings] = useState({})

  const PlotlyRenderers = createPlotlyRenderer(Plot)

  const pivotPresets = {
    cols: ['bütçe_periodu', 'bütçe_kısmı'],
    rows: ['kategori', 'alt_kategori', 'gelir', 'gider'],
    rendererName: 'Table Heatmap',
    aggregatorName: 'Sum',
    vals: ['fark'],
    hiddenFromAggregators: ['kategori', 'alt_kategori', 'bütçe_kısmı', 'bütçe_periodu'],
    hiddenAttributes: ['tenant_id'],
  }
  useEffect(() => {
    getDataByRoute('/rawdb/kategorigelirgider').then((value) => setWidgetData(value))
  }, [])

  return (
    <>
      <PivotTableUI
        data={widgetData}
        onChange={(s) => setSettings(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...pivotPresets}
        {...settings}
      />
    </>
  )
}

export default ButceOlusturKategori
