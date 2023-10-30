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

const GecelemeSayisiWidget = () => {
  const [gecelemeData, setGecelemeData] = useState([])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Periot Geceleme Sayıları',
      },
    },
  }
  const data = {
    labels: gecelemeData.map((data) => data.butce_ad),
    datasets: [
      {
        label: 'Geceleme',
        data: gecelemeData.map((data) => data.toplam_geceleme),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  useEffect(() => {
    getDataByRoute('/rawdb/gecelemesayisi').then((value) => setGecelemeData(value))
  }, [])

  return (
    <>
      <Line options={options} data={data} />
    </>
  )
}

export default GecelemeSayisiWidget
