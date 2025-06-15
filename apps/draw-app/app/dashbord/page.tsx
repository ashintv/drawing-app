'use client'
import { Background } from "@/components/bacground"
import { Card } from "@/components/card"
import Profile from "@/components/profile"

import { useRouter } from "next/navigation"
import Layout from "./layout"
export default function Dashboard() {
        const router = useRouter()
        return (
               <Layout>Hello</Layout>
        )
}