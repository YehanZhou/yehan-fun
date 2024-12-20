import Image from "next/image"
import { CategoryInterface } from "@/types/category"
import { LinkInterface } from "@/types/link"
import Link from "next/link"

export function LinkItem({ link }: { link: LinkInterface }) {
  return (
    <Link
      href={link.url}
      target="_blank"
    >
      <div className="relative mb-6 flex min-h-[122px] min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg  xl:mb-0">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 overflow-hidden rounded-full">
            {
              link.icon && (link.icon.indexOf('http') > -1|| link.icon.startsWith('/'))
                ? <Image
                    src={link.icon}
                    className="object-fill"
                    alt=""
                    width={40}
                    height={40}
                  /> 
                : <span className="h-full w-full rounded-full bg-purple-500 text-center font-bold leading-10">{ link.name?.slice(0, 1) }</span>
            }
          </div>
          <span className="text-xl font-bold text-primary">{ link.name }</span>
        </div>
        <div className="mt-2 line-clamp-2 text-sm text-primary">
          { link.description }   
        </div>
      </div>
    </Link>
  )
}

export function LinkContent({ navResources }: { navResources: CategoryInterface[] }) {
  return (
    <div className="w-full grow pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {
          navResources.map((category: CategoryInterface) => {
            return (
              <div id={category.id+''} key={category.id} className="mb-12">
                <div className="my-4">
                  <h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">{ category.name }</h1>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {
                    category.links.map!((link: LinkInterface) => (
                      <LinkItem link={link} key={link.id} />
                    ))
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
