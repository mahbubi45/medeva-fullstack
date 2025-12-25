import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChevronDown, BarChart3 } from "lucide-react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function VisitChart() {
  const data = {
    // Label disesuaikan dengan range di gambar
    labels: [
      "00:00 - 04:00",
      "04:00 - 08:00",
      "08:00 - 12:00",
      "12:00 - 16:00",
      "16:00 - 20:00",
      "20:00 - 24:00",
    ],
    datasets: [
      {
        label: "Laki-laki",
        data: [0, 0, 19, 1, 0, 0],
        backgroundColor: "#55B4FF",
        borderRadius: 4, // Sesuai lengkungan di gambar
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
      {
        label: "Perempuan",
        data: [0, 0, 15, 6, 0, 0],
        backgroundColor: "#D988F2",
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
      {
        label: "Lainnya",
        data: [0, 0, 9, 2, 0, 0],
        backgroundColor: "#FFC294",
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: "top",
        offset: -2, // Agar angka pas di atas batang
        color: (context) => context.dataset.backgroundColor,
        font: {
          weight: "600",
          size: 10,
        },
        formatter: (value) => (value > 0 ? value : "0"), // Tampilkan 0 kecil seperti di gambar
      },
    },
    layout: {
      padding: {
        top: 20, // Ruang untuk angka di atas batang paling tinggi
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { size: 10 },
          color: "#9CA3AF",
        },
      },
      y: {
        beginAtZero: true,
        max: 25,
        border: { display: false },
        grid: {
          color: "#F3F4F6", // Garis horizontal tipis seperti di gambar
          drawTicks: false,
        },
        ticks: {
          stepSize: 5,
          font: { size: 11 },
          color: "#9CA3AF",
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm font-sans w-full">
      {/* Header Chart */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg shrink-0">
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="font-bold text-gray-700 text-[13px]">
            Jumlah Kunjungan
          </h3>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
          Hari ini <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Info Total & Legend disesuaikan posisinya */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <p className="text-[12px] text-gray-500 font-medium">
          Terdapat total{" "}
          <span className="text-blue-500 font-extrabold">52</span> kunjungan
          dalam <span className="font-bold text-gray-800">Hari ini.</span>
        </p>

        {/* Legend: Pilah warna oval memanjang */}
        <div className="flex flex-wrap gap-4">
          <LegendItem color="bg-[#55B4FF]" label="Laki-laki" />
          <LegendItem color="bg-[#D988F2]" label="Perempuan" />
          <LegendItem color="bg-[#FFC294]" label="Lainnya" />
        </div>
      </div>

      {/* Area Chart */}
      <div className="h-[280px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      {/* Shape oval memanjang seperti di gambar */}
      <div className={`w-8 h-1.5 rounded-full ${color} shrink-0`}></div>
      <span className="text-[11px] font-bold text-gray-400">{label}</span>
    </div>
  );
}
