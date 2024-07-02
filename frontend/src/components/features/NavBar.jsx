import React from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport, } from '../ui/navigation-menu';


const NavBar = () => {
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <NavigationMenuLink>Link1</NavigationMenuLink>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Item two</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <NavigationMenuLink>Link2</NavigationMenuLink>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Item three</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <NavigationMenuLink>Link3</NavigationMenuLink>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>

    </NavigationMenu>
  };
  
  export default NavBar;
  