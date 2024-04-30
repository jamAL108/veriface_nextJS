"use client";
import React, { useEffect, useState } from "react";
import "../scss/nav.scss";
import Scroll from "../utils/scroll";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link'
import { Menu } from "lucide-react";
const Navbar = () => {
  return (
    <div className="py-[10px] min-w-[min(1400px,90%)] flex h-[5.5rem]  w-[min(1400px , 90vw)] justify-between items-center">
      <div className="flex w-[100px] tab:justify-center items-center my-[10px]">
        <img
          src="./images/Vlogo.png"
          alt=""
          className="base:w-[70px] select-none base:h-[60px] tab:w-[90px] tab:h-[80px]"
        />
      </div>
      <div className="px-[10px] base:hidden bl:flex items-center justify-center gap-[30px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
            Scroll("inst");
          }}
        >
          Guide
        </button>
        <Link
          href='/privacy'
        >
          Privacy
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
            Scroll("games");
          }}
        >
          Games
        </button>
        <button>Creators</button>
      </div>
      <Sheet>
        <SheetTrigger className="base:flex bl:hidden">
          <Menu size={24} color="white" />
        </SheetTrigger>
        <SheetContent className="z-[100000] px-[10px]">
          <SheetHeader className="mt-[10px]">
            <SheetTitle>
              <img
                src="./images/Vlogo.png"
                alt=""
                className="base:w-[50px] base:h-[45px] tab:w-[60px] tab:h-[55px]"
              />
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 w-full py-[30px]">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Guide
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Detect Videos
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                Games
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Creators
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
