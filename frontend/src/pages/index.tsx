import { Button } from '@chakra-ui/react'
import styles from './index.module.css'
import Head from 'next/head'
import { env } from '~/env.mjs'

export default function Home () {
  return (
    <>
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Admin app" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            {env.NEXT_PUBLIC_BACKEND_BASE_URL}
          </h1>
        </div>
        <Button colorScheme='blue'>Login</Button>
      </main>
    </>
  )
}
