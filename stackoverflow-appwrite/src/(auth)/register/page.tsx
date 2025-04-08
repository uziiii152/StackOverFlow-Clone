"use client"

import { useAuthStore } from '@/Store/Auth'
import React from 'react'

function registerPage(){
    const {createAccount,login} = useAuthStore()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
// collect data 
const formData = new FormData(e.currentTarget)
const firstName = formData.get('firstName')
const lastName = formData.get('lastName')
const email = formData.get('email')
const password = formData.get('password')
// validate

if(!firstName || !lastName || !email || !password){
    setError(() => "All fields are required")
    return
}
//call the store

setLoading(true)
setError("")

const response = await createAccount(
    `${firstName} ${lastName}`,
    email?.toString(),
    password?.toString()
)

if(response.error){
    setError(() => response.error!.message)
}else{
    const loginResponse = await login(email.toString(),password.toString())
    if(loginResponse.error){
        setError(() => loginResponse.error!.message)
    }
}


  return (
    <div>registerPage</div>
  )
}
}
export default registerPage