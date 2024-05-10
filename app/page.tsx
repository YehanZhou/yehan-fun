import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { LinkContent } from "./components/link-content"
import { Sidebar } from "./components/sidebar"
import { getCategories, getLinksByCategoryId } from "@/actions/linkActions";
import { CategoryInterface } from "@/types/category"


export const revalidate = 24 * 60 * 60;

export default async function IndexPage() {
  const navResources: CategoryInterface[] = await getCategories();
  const navItems = navResources.map((n) => {
    return {
      name: n.name,
      icon: n.icon,
      id: n.id,
    }
  })
  return <div className="container relative mx-auto min-h-screen w-full px-0">
      <div className="flex">
        <div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block ">
         <Sidebar navItems={navItems} />
        </div>
        <div className="flex-1 sm:pl-[16rem]">
          <SiteHeader navItems={navItems} />
          <LinkContent navResources={navResources} />
          <SiteFooter />
        </div>
      </div>
    </div>
}
