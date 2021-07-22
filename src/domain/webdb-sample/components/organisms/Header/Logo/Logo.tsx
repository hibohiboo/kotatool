import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'
// ___________________________________________________________________________
//
export const Logo = () => (
  <h1 className={styles.module}>
    <Link prefetch={false} href={`/github/`}>
      <a>Next.js x Github API</a>
    </Link>
  </h1>
)
