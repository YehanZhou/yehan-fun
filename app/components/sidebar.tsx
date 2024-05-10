"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CategoryInterface } from "@/types/category"
import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export interface SidebarProps {
  className?: string
  navItems: Pick<CategoryInterface, "name" | "icon" | "id">[]
}

export function Sidebar({ className, navItems }: SidebarProps) {
  const [activeTabId, setActiveTabId] = useState(navItems[0]?.id)
  useEffect(() => {
    const ele = document.getElementById(activeTabId + '')
    const elePosition = ele?.getBoundingClientRect().top || 0
    const offsetPosition = elePosition + window.pageYOffset - 75
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }, [activeTabId])
  return (
    <nav className="after:h-[calc(100vh - 65px)] block min-h-screen w-60 flex-row flex-nowrap bg-background font-semibold sm:px-6 sm:pb-6">
      <a
        href=""
        className="mx-6 hidden h-16 flex-col items-center justify-center sm:flex"
      >
        <Image
          src="https://cos.codefe.top/images/web-nav-icon.png"
          alt=""
          width={200}
          height={60}
        />
      </a>
      <div className="flex-start relative z-40 flex h-auto w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded pt-4 opacity-100">
        <div className="flex list-none flex-col md:min-w-full md:flex-col">
          <div className={cn("flex-none pb-12", className)}>
            <div className="space-y-4 pb-4">
              <div className="py-2">
                <div className="space-y-1">
                  {navItems.map((category) => {
                    return (
                      <div
                        className={`block cursor-pointer rounded-lg hover:bg-gray-100 hover:text-purple-500 ${
                          activeTabId === category.id
                            ? "bg-gray-100 text-purple-500"
                            : "text-primary"
                        }`}
                        key={category.id}
                        onClick={() => setActiveTabId(category.id)}
                      >
                        <div className="scale relative mb-2 flex items-center gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-6 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                          <div className="relative flex shrink-0">

                            {
                              category.icon && category.icon.indexOf('http') > -1
                                ? <Image
                                    src={category.icon}
                                    className="block"
                                    alt=""
                                    width={20}
                                    height={20}
                                  /> 
                                : <span className="block h-5 w-5 rounded-full bg-purple-500 text-center font-bold leading-5 text-white">{ category.name.slice(0, 1) }</span>
                            }
                          </div>
                          <div className="flex flex-1 items-center justify-between truncate">
                            <span>{category.name}</span>
                            <Cross2Icon/>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="flex justify-center">
                   <Button variant="outline" className="w-full">
                    <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Category
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
