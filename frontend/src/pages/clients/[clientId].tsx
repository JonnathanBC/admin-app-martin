import {
  Container,
  Heading,
  Card
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ClientForm } from '~/components/entities/clients/ClientForm'

const EditClient: NextPage = () => {
  const router = useRouter()

  return (
    <Container mt={8}>
      <Card p={4}>
        <Heading textAlign='center'>Editando cliente</Heading>
        <ClientForm clientId={router.query.clientId as string} />
      </Card>
    </Container>
  )
}

export default EditClient
