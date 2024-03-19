import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return(
        <div>
            <Link href='/auth/register'>Home</Link>
            <Link href='/splash'>Splash Screen </Link>
            <Link href='/preference'>profile Screen </Link>
        </div>
    )
}