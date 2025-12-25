import StatCard from "../components/cards/StatCard";
import VisitChart from "../components/charts/VisitChart";
import ScheduleCalendar from "../components/calendar/ScheduleCalendar";

export default function Dashboard() {
  return (
    // Bagian ini kunci utamanya: h-screen minus Topbar, lalu overflow-y-auto
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#f8fafc]">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* STAT CARDS - Responsive Grid */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              title="Kunjungan Asuransi"
              value="0"
              subtitle="Hari ini"
              description="Tidak ada penambahan jumlah Kunjungan Asuransi pada daftar."
            />
            <StatCard
              title="Kunjungan BPJS"
              value="50"
              subtitle="Hari ini"
              description="Terdapat penambahan jumlah Kunjungan BPJS sebanyak 50 hari ini."
            />
            <StatCard
              title="Kunjungan Umum"
              value="2"
              subtitle="Hari ini"
              description="Terdapat penambahan jumlah Kunjungan Umum sebanyak 2 hari ini."
            />
          </div>

          {/* CHART - Responsive Span */}
          <div className="col-span-12 xl:col-span-8">
            <VisitChart />
          </div>

          {/* CALENDAR - Responsive Span */}
          <div className="col-span-12 xl:col-span-4">
            <ScheduleCalendar />
          </div>

          {/* Jarak tambahan bawah agar tidak tertutup menu mobile */}
          <div className="col-span-12 h-20 md:hidden"></div>
        </div>
      </div>
    </div>
  );
}
