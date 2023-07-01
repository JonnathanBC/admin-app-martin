import { Button, ButtonGroup, Card, Container, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Admin app" />
      </Head>
      <Container mt={8}>
        <Card p={4}>
          <Heading>Mis ventas</Heading>
          <ButtonGroup mt={8}>
            <Button
              onClick={() => router.push('/login')}
              colorScheme='blue'
            >
              Iniciar sesión
            </Button>
            <Button
              onClick={() => router.push('/clients')}
              colorScheme='purple'
            >
              Clientes
            </Button>
          </ButtonGroup>
        </Card>
      </Container>
    </>
  )
}
