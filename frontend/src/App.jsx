import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import DriversHomePage from "./pages/DriversHomePage"

function App() {
  return (
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
    //         <NavigationMenuContent>
    //           <NavigationMenuLink>Link1</NavigationMenuLink>
    //         </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>

    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Item two</NavigationMenuTrigger>
    //         <NavigationMenuContent>
    //           <NavigationMenuLink>Link2</NavigationMenuLink>
    //         </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>

    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Item three</NavigationMenuTrigger>
    //         <NavigationMenuContent>
    //           <NavigationMenuLink>Link3</NavigationMenuLink>
    //         </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>

    // </NavigationMenu>
    <DriversHomePage/>
  )
}

export default App
