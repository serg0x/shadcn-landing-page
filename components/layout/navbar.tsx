"use client";
import React, { useEffect, useState } from "react";
import { ChevronsDown, Github, Twitter, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "https://docs.anyrand.com/",
    label: "Docs",
  },
  {
    href: "https://t.me/anyrandVRF",
    label: "Support",
  },
  {
    href: "https://x.com/anyrandVRF",
    label: "Twitter/X",
  },
  {
    href: "https://github.com/frogworksio/anyrand",
    label: "GitHub",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Showcase Your Value ",
    description: "Highlight how your product solves user problems.",
  },
  {
    title: "Build Trust",
    description:
      "Leverages social proof elements to establish trust and credibility.",
  },
  {
    title: "Capture Leads",
    description:
      "Make your lead capture form visually appealing and strategically.",
  },
];

export const Navbar = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [logoSrc, setLogoSrc] = useState("/anyrand-logo-dark.svg"); // Default/fallback logo

  // Update the logo when the theme is resolved
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogoSrc("/anyrand-logo-white.svg");
    } else if (resolvedTheme === "light") {
      setLogoSrc("/anyrand-logo-dark.svg");
    }
  }, [resolvedTheme]); // Run this effect when the resolvedTheme changes

  return (
    <header className="backdrop-blur bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center p-2">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image
          alt="Logo anyrand"
          src={logoSrc} // This will be dynamically updated
          width={144} // Specify the appropriate width
          height={25.85} // Specify the appropriate height
          className="object-contain"
        />
      </Link>

      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      alt="Logo anyrand"
                      src={logoSrc}
                      width={150} // Specify the appropriate width
                      height={60} // Specify the appropriate height
                      className="max-h-20 w-full object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link target="_blank" href={href}>
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  target="_blank"
                  className="px-6 tracking-normal font-medium text-sm dark:text-slate-300 dark:hover:text-white transition duration-150 ease-in-out"
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ToggleTheme />
      </div>
    </header>
  );
};
