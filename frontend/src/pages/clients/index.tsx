import { Button, ButtonGroup, Card, Container, Heading, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ClientsList } from '~/components/entities/ClientsList'
import { getAllClients } from '~/services/clients'

const ClientPage: NextPage = () => {
  const router = useRouter()
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getAllClients
  })

  if (isLoading) return <p>Loading</p>

  return (
    <Container mt={8}>
      <Card p={4}>
        <Heading>Clientes</Heading>
        {isLoading
          ? <Spinner />
          : <ClientsList clients={clients} />
        }
        <ButtonGroup mt={4}>
          <Button
            onClick={() => router.push('/clients/new')}
            colorScheme='blue'
            >
              Nuevo cliente
          </Button>
          <Button
            colorScheme='gray'
            onClick={() => router.push('/')}
          >
            Volver
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  )
}

export default ClientPage
