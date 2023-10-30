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

const GecelemeMusteriSayisiWidget = () => {
  const [widgetData, setWidgetData] = useState([])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Periot Geceleme ve Müşteri Sayıları Tahminleri',
      },
    },
  }
  const data = {
    labels: widgetData?.map((data) => data.butce_ad),
    datasets: [
      {
        label: 'Geceleme',
        data: widgetData?.map((data) => parseInt(data.toplam_geceleme)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Konaklayan Sayısı',
        data: widgetData?.map((data) => parseInt(data.musteri_sayisi)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  useEffect(() => {
    getDataByRoute('/rawdb/gecelememusterisayisi').then((value) => setWidgetData(value))
  }, [])

  return (
    <>
      <Line options={options} data={data} />
    </>
  )
}

export default GecelemeMusteriSayisiWidget
