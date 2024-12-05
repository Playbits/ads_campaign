import { ChevronDown, Globe } from "lucide-react"

export default function DashboardFooter() {
  return (
    <footer className="sticky bottom-0 mt-auto flex h-[80px] items-center justify-between gap-4 border-t border-[#00000033] bg-[#F5F6F6] pb-6 pl-6 pr-6 pt-4 font-['Geist']">
      <p className="text-sm font-normal text-[#737373]">@ 2024 NIPEX</p>
      <button className="bg-white-500 flex h-10 items-center gap-2 whitespace-nowrap rounded-md border border-[#D4D4D4] px-4 py-2 hover:border-gray-400">
        <Globe width={16} height={16} />
        <p className="text-sm font-medium text-[#171717]">ENG</p>
        <ChevronDown width={16} height={16} />
      </button>
    </footer>
  )
}
