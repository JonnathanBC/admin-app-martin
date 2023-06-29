import { Button, ButtonGroup, Container, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { createSale, getSales } from '~/services/sales'

export default function Home () {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Admin app" />
      </Head>
      <Container marginTop={8}>
        <Heading>Mis ventas</Heading>
        <ButtonGroup>
          <Button
            onClick={() => {
              router.push('/login')
            }}
            colorScheme='blue'
          >
            Login
          </Button>
          <Button
            onClick={() => {
              getSales()
            }}
            colorScheme='green'
          >
            Get sales
          </Button>
          <Button
            onClick={createSale}
            colorScheme='purple'
          >
            Crear Sale
          </Button>
        </ButtonGroup>
      </Container>
    </>
  )
}
