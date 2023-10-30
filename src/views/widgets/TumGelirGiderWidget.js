import React, { useEffect, useState } from 'react'
import { getDataByRoute } from '../../util'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const TumGelirGiderWidget = () => {
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
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
        backgroundColor: 'rgba(124, 200, 20, 0.5)',
      },
    ],
  }
  useEffect(() => {
    getDataByRoute('/rawdb/tumgelirgider').then((value) => setWidgetData(value))
  }, [])

  return (
    <>
      <Line options={options} data={data} />
    </>
  )
}

export default TumGelirGiderWidget
