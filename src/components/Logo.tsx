import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-600 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          JobTrack
        </span>
        {/* <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-60 bg-clip-text text-transparent">er</span> */}
      </div>
    </Link>
  );
}