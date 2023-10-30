import React, { useEffect, useState } from 'react'
import { getDataByRoute } from '../../util'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const TumGelirGiderWidget2 = () => {
  const [widgetData, setWidgetData] = useState([])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Toplam Gelir Gider Bilgileri',
      },
    },
  }
  const data = {
    labels: widgetData?.map((data) => data.ad),
    datasets: [
      {
        label: 'Gelirler',
        data: widgetData?.map((data) => data.toplam_gelir),
        borderColor: 'white',
        backgroundColor: 'rgba(24, 116, 205, 0.5)',
      },
      {
        label: 'Giderler',
        data: widgetData?.map((data) => data.toplam_gider),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Fark',
        data: widgetData?.map((data) => data.toplam_fark),
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(105, 139, 105, 0.5)',
      },
    ],
  }
  useEffect(() => {
    getDataByRoute('/rawdb/tumgelirgider').then((value) => setWidgetData(value))
  }, [])

  return (
    <>
      <Bar options={options} data={data} />
    </>
  )
}

export default TumGelirGiderWidget2
