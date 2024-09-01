// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Skeleton } from "@/components/ui/skeleton"

// const UserDetails = () => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [editing, setEditing] = useState(false)
//   const [editedUser, setEditedUser] = useState(null)

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const userId = localStorage.getItem('userId')
//         const response = await axios.get(`http://localhost:1000/user/get-user${userId}`)
//         setUser(response.data)
//         setEditedUser(response.data)
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching user details:', error)
//         setLoading(false)
//       }
//     }

//     fetchUserDetails()
//   }, [])

//   const handleEdit = () => {
//     setEditing(true)
//   }

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:1000/user/get-user${user._id}`, editedUser)
//       setUser(editedUser)
//       setEditing(false)
//     } catch (error) {
//       console.error('Error updating user details:', error)
//     }
//   }

//   const handleChange = (e) => {
//     setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
//   }

//   if (loading) {
//     return (
//       <Card className="w-[350px] mx-auto mt-10">
//         <CardHeader>
//           <Skeleton className="h-12 w-1/2 mb-4" />
//           <Skeleton className="h-4 w-full" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
//           <Skeleton className="h-4 w-full mb-2" />
//           <Skeleton className="h-4 w-full mb-2" />
//           <Skeleton className="h-4 w-full mb-2" />
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card className="w-[350px] mx-auto mt-10">
//       <CardHeader>
//         <CardTitle>User Profile</CardTitle>
//         <CardDescription>View and edit your profile information</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col items-center mb-4">
//           <Avatar className="h-32 w-32">
//             <AvatarImage src={user.avatarUrl} alt={user.name} />
//             <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//           </Avatar>
//         </div>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input 
//                 id="name" 
//                 name="name"
//                 value={editing ? editedUser.name : user.name}
//                 onChange={handleChange}
//                 disabled={!editing}
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="email">Email</Label>
//               <Input 
//                 id="email" 
//                 name="email"
//                 value={editing ? editedUser.email : user.email}
//                 onChange={handleChange}
//                 disabled={!editing}
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="role">Role</Label>
//               <Input 
//                 id="role" 
//                 name="role"
//                 value={user.role}
//                 disabled
//               />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         {editing ? (
//           <>
//             <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
//             <Button onClick={handleSave}>Save Changes</Button>
//           </>
//         ) : (
//           <Button onClick={handleEdit}>Edit Profile</Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

// export default UserDetails




import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

const UserDetails = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-user/${userId}`)
        setUser(response.data)
        setEditedUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user details:', error)
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [])

  const handleEdit = () => setEditing(true)

  const handleCancel = () => {
    setEditedUser(user)
    setEditing(false)
  }

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId')
      await axios.put(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/update-user/${userId}`, editedUser)
      setUser(editedUser)
      setEditing(false)
    } catch (error) {
      console.error('Error updating user details:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setEditedUser(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }))
    } else {
      setEditedUser(prev => ({ ...prev, [name]: value }))
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full mb-2" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'rgba(255,247,237,1)', padding: '2rem' }}>
      <Card className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg border border-orange-600">
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl font-bold text-center text-black">User Profile</CardTitle>
          <CardDescription className="text-center text-black-600">View and edit your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button 
              onClick={editing ? handleCancel : handleEdit} 
              className="bg-orange-500 text-black p-2 rounded hover:bg-orange-600" 
              
            >
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className='text-sm'>Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={editing ? editedUser.name : user.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className='text-sm'>Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    value={editing ? editedUser.email : user.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className='text-sm'>Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={editing ? editedUser.phone : user.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address.streetName" className='text-sm'>Street Name</Label>
                  <Input 
                    id="address.streetName" 
                    name="address.streetName"
                    value={editing ? editedUser.address.streetName : user.address.streetName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="address.city" className='text-sm'>City</Label>
                  <Input 
                    id="address.city" 
                    name="address.city"
                    value={editing ? editedUser.address.city : user.address.city}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="address.province" className='text-sm'>Province</Label>
                  <Input 
                    id="address.province" 
                    name="address.province"
                    value={editing ? editedUser.address.province : user.address.province}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="address.country" className='text-sm'>Country</Label>
                  <Input 
                    id="address.country" 
                    name="address.country"
                    value={editing ? editedUser.address.country : user.address.country}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="address.postalCode" className='text-sm'>Postal Code</Label>
                  <Input 
                    id="address.postalCode" 
                    name="address.postalCode"
                    value={editing ? editedUser.address.postalCode : user.address.postalCode}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center mt-6">
          {editing && (
            <Button onClick={handleSave} className="bg-orange-500 text-black p-2 rounded hover:bg-orange-600" >
              Save Changes
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default UserDetails