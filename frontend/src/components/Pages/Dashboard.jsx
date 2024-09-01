import { Link, useNavigate } from "react-router-dom"
import IssueReporting from "./IssueReporting"

import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  CircleAlert, 
  Users2,
  Compass,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { useState,useEffect,Fragment } from "react"
import axios, { all } from 'axios'
import { MessageCircleWarning } from 'lucide-react';


const Dashboard = () =>  {

    const navigate = useNavigate();
    const role = localStorage.getItem('role');
   
    const userId = localStorage.getItem('userId');
 
 
    const driverId = localStorage.getItem('driverId');
 
    
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    // /get-user/:id

    const fetchUserDetails = async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-user/${userId}`);
      setUserDetails(response.data.user);
      setIsProfileOpen(true);
    };
    


     const [garbageDetails, setGarbageDetails] = useState([]);
     const [allGarbageDetails, setAllGarbageDetails] = useState([]);
     const [dataChanged, setDataChanged] = useState(false);
     const [filter, setFilter] = useState({all: true,issues: false,noIssues: false});
     const [isProfileOpen, setIsProfileOpen] = useState(false);
     const [userDetails, setUserDetails] = useState(null);

     //get all garbage details of a user
      useEffect(() => {
        if(role === 'user')
        {const fetchGarbageDetails = async () => {
          const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-garbage-details/${userId}`);
          setGarbageDetails(response.data.garbage);
          console.log('all garbage detatils',response.data);
        };
        return () => fetchGarbageDetails();
        }
        if(role === 'driver'){
          const fetchAllGarbageDetails = async () => {
            const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/get-all-garbage-details`);
            setAllGarbageDetails(response.data.garbage);
            console.log('all garbages',response.data);
          };
          return () => fetchAllGarbageDetails();
        }
      }, [userId,driverId,dataChanged]);

      const filteredGarbageDetails = garbageDetails.filter(item => {
        if (filter.all) return true;
        if (filter.issues) return item.issueReported;
        if (filter.noIssues) return !item.issueReported;
        return false;
      });
      

      //get all garbage details by the driver
      // useEffect(() => {
      //   const fetchAllGarbageDetails = async () => {
      //     const response = await axios.get('http://localhost:1000/user/get-all-garbage-details');
      //     // setAllGarbageDetails(response.data.garbage);
      //     console.log('all garbages',response.data);
      //   };
      //   return () => fetchAllGarbageDetails();
      // }, [userId,dataChanged]);

      const handlePickedUp = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/garbage/update-pickup-status/${id}`, { status: 'Picked Up' });
          setDataChanged((prev) => !prev);
        } catch (err) {
          console.error('Failed to update pickup status', err);
        }
      };

      const handlePending = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/garbage/update-pickup-status/${id}`, { status: 'Pending' });
          setDataChanged((prev) => !prev);
        } catch (err) {
          console.error('Failed to update pickup status', err);
        }
      };

      const handleReportIssue = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/garbage/report-issue/${id}`);
          setDataChanged((prev) => !prev);
        } catch (err) {
          console.error('Failed to report issue', err);
        }
      };

      const handleIssueSolved = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/garbage/issue-solved/${id}`);
          setDataChanged((prev) => !prev);
        } catch (err) {
          console.error('Failed to mark issue as solved', err);
        }
      };

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

       // Group garbageDetails by date
  const groupedByDate = 
   allGarbageDetails.reduce((acc, item) => {
        const date = formatDate(item.date);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const groupedByDatePicked = allGarbageDetails.reduce((acc, item) => {
      if (item.pickupStatus === 'Picked Up') {
        const date = formatDate(item.date);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

    const groupedByDatePending = allGarbageDetails.reduce((acc, item) => {
      
      if (item.pickupStatus === 'Pending') {
        const date = formatDate(item.date);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

    const groupedByDateIncomplete = allGarbageDetails.reduce((acc, item) => {
      if (item.pickupStatus === "Didn't Pickup") {
        const date = formatDate(item.date);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

    const groupedByDateIssues = allGarbageDetails.reduce((acc, item) => {
      if (item.issueReported) {
        const date = formatDate(item.date);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

    const groupedByDateNoIssues = allGarbageDetails.reduce((acc, item) => {
      if (!item.issueReported) {
        const date = formatDate(item.date);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});


  return (
    <div className="flex min-h-screen w-full flex-col bg-orange-50">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4 ">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-orange-600  text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all  group-hover:scale-110" />
            <span className="sr-only ">Acme Inc</span>
          </Link>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
        </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                {...role === 'user' ? { to: "/mapview" } : { to: '/driver-home-page' }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Compass className="h-5 w-5" />
                <span className="sr-only">Track the route</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Track the route</TooltipContent>
          </Tooltip>
        </TooltipProvider>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={`/issuereporting/${userId}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <CircleAlert className="h-5 w-5" />
                <span className="sr-only">{role==='user'?'Report Issues':'View Issues'}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Report Issues</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/issuereporting"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <MessageCircleWarning  className="h-5 w-5" />
                <span className="sr-only">Issues</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Issues</TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 mt-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Track the route
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <CircleAlert className="h-5 w-5" />
                  Report Issues
                </Link>
                {/* <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="/issuereporting"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <MessageCircleWarning className="h-5 w-5"/>
                  Issues
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link> */}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="font-bold ml-10 text-lg">{role=="user"? 'User' : 'Driver'} Dashboard</h1>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className='justify-center flex'>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={'/add-user-details'}><DropdownMenuItem className='justify-center flex'><button>Profile</button></DropdownMenuItem></Link>
              
              <DropdownMenuItem className='justify-center flex'>Settings</DropdownMenuItem>
              <DropdownMenuItem className='justify-center flex'>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='p-0 justify-center hover:bg-none text-black' onClick={logout}><button className="bg-red-200 hover:bg-red-300 w-full py-2 rounded">Logout</button></DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
          
        </header>
        <main className="grid flex-1 mx-8 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
            <div className="flex items-center ">
              <TabsList >
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="incomplete" className="hidden sm:flex">
                Incomplete
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem 
                       checked={filter.all}
                       onCheckedChange={() => setFilter({all: true,issues: false,noIssues: false})}
                    >
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem 
                       checked={filter.issues}
                       onCheckedChange={() => setFilter({all: false,issues: true,noIssues: false})}
                    >
                      Issues
                    </DropdownMenuCheckboxItem>
                    
                    <DropdownMenuCheckboxItem
                        checked={filter.noIssues}
                        onCheckedChange={() => setFilter({all: false,issues: false,noIssues: true})}
                    >
                      No Issues
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button> */}
                {role === 'user' && (
                  <Link to={'/add-garbage-details'} size="sm" className="h-7 items-center bg-orange-600 px-2 hover:bg-green-700 rounded-md text-white flex gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Garbage Details
                  </span>
                </Link>
                )}
              </div>
            </div>
            <TabsContent value="all" >
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Daily Garbage Pickups</CardTitle>
                  <CardDescription>
                    view all your pickup details.
                  </CardDescription>
                </CardHeader>
                <CardContent >
                {role === 'user' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Truck Number</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGarbageDetails.map((item) => (
                      <TableRow key={item._id}
                      style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                      >
                        <TableCell >{formatDate(item.date)}</TableCell>
                        <TableCell className="font-medium hidden md:table-cell">s2416</TableCell>
                        <TableCell>
                          <Badge variant="outline" className='bg-white p-1 px-2'>
                            {item.pickupStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                             {
                              !item.issueReported  &&(
                                <DropdownMenuItem onClick={() => handleReportIssue(item._id)}>Report Issue</DropdownMenuItem>
                              )
                             }
                              {item.issueReported && (
                                <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                              )}
                              {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        
                        {item.issueReported && (
                            <TableCell>
                              <span role="img" aria-label="reported">🚩</span>
                            </TableCell>
                          )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                )}
                {role === 'driver' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Pickup Location</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
            {Object.entries(filter.all ? groupedByDate : filter.issues ? groupedByDateIssues : groupedByDateNoIssues)
            .map(([date, items]) => (
              <Fragment key={date}>
                {items.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className='hover:bg-transparent'
                  >
                    {index === 0 && <TableCell  rowSpan={items.length}>{date}</TableCell>}
                    <TableCell 
                      className="font-medium hidden md:table-cell"
                      style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                    >
                      {item.location.streetName},{item.location.city},{item.location.province}...
                    </TableCell>
                    <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                      <Badge variant="outline" className='bg-white p-1 px-2'>
                        {item.pickupStatus}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="button-no-outline">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                          {item.issueReported && (
                            <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                          )}
                          {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    {item.issueReported && (
                      <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                        <span role="img" aria-label="reported">🚩</span>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
                </Table>
                )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>


            <TabsContent value="completed" >
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Completed Pickups</CardTitle>
                  <CardDescription>
                    view all picked up details.
                  </CardDescription>
                </CardHeader>
                <CardContent >
                {role === 'user' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Truck Number</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGarbageDetails.map((item) => (
                      
                      <TableRow key={item._id}
                        style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                      >
                        {item.pickupStatus === 'Picked Up' && (
                          <>
                            <TableCell >{formatDate(item.date)}</TableCell>
                            <TableCell className="font-medium hidden md:table-cell">s2416</TableCell>
                            <TableCell>
                              <Badge variant="outline" className='bg-white p-1 px-2'>
                                {item.pickupStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                                  {
                                  !item.issueReported  &&(
                                    <DropdownMenuItem onClick={() => handleReportIssue(item._id)}>Report Issue</DropdownMenuItem>
                                    )
                                  }
                                  {item.issueReported && (
                                    <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                                  )}
                                  {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>                           
                            
                            {item.issueReported && (
                              <TableCell>
                                <span role="img" aria-label="reported">🚩</span>
                              </TableCell>
                            )}
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                )}
                {role === 'driver' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Pickup Location</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
            {Object.entries(groupedByDatePicked).map(([date, items]) => (
              <Fragment key={date}>
                {items.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className='hover:bg-transparent'
                  >
                    {item.pickupStatus === 'Picked Up' &&(
                      <>
                      {index === 0 && <TableCell  rowSpan={items.length}>{date}</TableCell>}
                        <TableCell 
                          className="font-medium hidden md:table-cell"
                          style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                        >
                          {item.location.streetName},{item.location.city},{item.location.province}...
                        </TableCell>
                        <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                          <Badge variant="outline" className='bg-white p-1 px-2'>
                            {item.pickupStatus}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" className="button-no-outline">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                              {item.issueReported && (
                                <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                              )}
                              {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        {item.issueReported && (
                          <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                            <span role="img" aria-label="reported">🚩</span>
                          </TableCell>
                        )}
                      
                      </>
                    )}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
                </Table>
                )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pending" >
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Pending Pickups</CardTitle>
                  <CardDescription>
                    view all pending pickup details.
                  </CardDescription>
                </CardHeader>
                <CardContent >
                {role === 'user' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Truck Number</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGarbageDetails.map((item) => (
                      
                      <TableRow key={item._id}
                        style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                      >
                        {item.pickupStatus === 'Pending' && (
                          <>
                            <TableCell >{formatDate(item.date)}</TableCell>
                            <TableCell className="font-medium hidden md:table-cell">s2416</TableCell>
                            <TableCell>
                              <Badge variant="outline" className='bg-white p-1 px-2'>
                                {item.pickupStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                                  {
                                    !item.issueReported  &&(
                                    <DropdownMenuItem onClick={() => handleReportIssue(item._id)}>Report Issue</DropdownMenuItem>
                                  )
                                   }
                                  {item.issueReported && (
                                    <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                                  )}
                                  {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>                           
                            
                            {item.issueReported && (
                              <TableCell>
                                <span role="img" aria-label="reported">🚩</span>
                              </TableCell>
                            )}
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                )}
                {role === 'driver' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Pickup Location</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
            {Object.entries(groupedByDatePending).map(([date, items]) => (
              <Fragment key={date}>
                {items.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className='hover:bg-transparent'
                  >
                    {item.pickupStatus === 'Pending' &&(
                      <>
                      {index === 0 && <TableCell  rowSpan={items.length}>{date}</TableCell>}
                        <TableCell 
                          className="font-medium hidden md:table-cell"
                          style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                        >
                          {item.location.streetName},{item.location.city},{item.location.province}...
                        </TableCell>
                        <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                          <Badge variant="outline" className='bg-white p-1 px-2'>
                            {item.pickupStatus}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" className="button-no-outline">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                              {item.issueReported && (
                                <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                              )}
                              {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        {item.issueReported && (
                          <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                            <span role="img" aria-label="reported">🚩</span>
                          </TableCell>
                        )}
                      
                      </>
                    )}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
                </Table>
                )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="incomplete" >
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Incomplete Pickups</CardTitle>
                  <CardDescription>
                    view all incomplete pickup details.
                  </CardDescription>
                </CardHeader>
                <CardContent >
                {role === 'user' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Truck Number</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGarbageDetails.map((item) => (
                      
                      <TableRow key={item._id}
                        style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                      >
                        {item.pickupStatus === "Didn't Pickup" && (
                          <>
                            <TableCell >{formatDate(item.date)}</TableCell>
                            <TableCell className="font-medium hidden md:table-cell">s2416</TableCell>
                            <TableCell>
                              <Badge variant="outline" className='bg-white p-1 px-2'>
                                {item.pickupStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                                  {
                                  !item.issueReported  &&(
                                    <DropdownMenuItem onClick={() => handleReportIssue(item._id)}>Report Issue</DropdownMenuItem>
                                    )
                                  }
                                  {item.issueReported && (
                                    <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                                  )}
                                  {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>                           
                            
                            {item.issueReported && (
                              <TableCell>
                                <span role="img" aria-label="reported">🚩</span>
                              </TableCell>
                            )}
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                )}
                {role === 'driver' && (
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Pickup Location</TableHead>
                      <TableHead>Pickup Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
            {Object.entries(groupedByDateIncomplete).map(([date, items]) => (
              <Fragment key={date}>
                {items.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className='hover:bg-transparent'
                  >
                    {item.pickupStatus === "Didn't Pickup" &&(
                      <>
                      {index === 0 && <TableCell  rowSpan={items.length}>{date}</TableCell>}
                        <TableCell 
                          className="font-medium hidden md:table-cell"
                          style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}
                        >
                          {item.location.streetName},{item.location.city},{item.location.province}...
                        </TableCell>
                        <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                          <Badge variant="outline" className='bg-white p-1 px-2'>
                            {item.pickupStatus}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" className="button-no-outline">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handlePickedUp(item._id)}>Picked Up</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePending(item._id)}>Pending</DropdownMenuItem>
                              {item.issueReported && (
                                <DropdownMenuItem onClick={() => handleIssueSolved(item._id)}>Issue Solved</DropdownMenuItem>
                              )}
                              {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        {item.issueReported && (
                          <TableCell style={{ backgroundColor: item.issueReported ? '#ffedd5' : 'transparent' }}>
                            <span role="img" aria-label="reported">🚩</span>
                          </TableCell>
                        )}
                      
                      </>
                    )}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
                </Table>
                )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

          </Tabs>
        </main>
        

      
      </div>
    </div>
  )
}
export default Dashboard




