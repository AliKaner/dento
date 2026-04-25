"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#0f1117] px-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-slate-200 transition-colors">
          Dashboard
        </Link>
        {paths.map((path, i) => (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-slate-600" />
            <span className={i === paths.length - 1 ? "text-slate-200 font-medium capitalize" : "capitalize"}>
              {path.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-white/5 rounded-full border-0">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0f1117]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e3a5f] text-brand-300 hover:bg-[#1e3a5f]/80 border-0 outline-none">
            <User className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-white/10 bg-[#13151f] text-slate-200" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">Dr. Ahmet Yılmaz</p>
                <p className="text-xs leading-none text-slate-400">ahmet@dentaflow.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer p-0">
              <Link href="/settings" className="flex items-center w-full px-2 py-1.5">
                <User className="mr-2 h-4 w-4 text-slate-500" />
                <span>Profil Ayarları</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer p-0">
              <Link href="/login" className="flex items-center w-full px-2 py-1.5">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
