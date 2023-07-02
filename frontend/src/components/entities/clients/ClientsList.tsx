import { Card, Flex, Text } from '@chakra-ui/react'
import { Client } from './ClientForm'
import { useRouter } from 'next/router'

interface ClientFromDB extends Client {
  _id: string
}

interface Props {
  clients: ClientFromDB[]
}

export function ClientsList ({ clients }: Props) {
  const router = useRouter()

  return (
    <Flex flexDirection='column' gap={2} mt={2}>
      {clients.map(client => (
        <Card
          py={2}
          px={4}
          key={client._id}
          cursor={'pointer'}
          _hover={{ bg: 'blue.500', color: 'white' }}
          onClick={() => router.push(`/clients/${client._id}`)}
        >
          <Text>{client.firstname}</Text>
        </Card>
      ))}
    </Flex>
  )
}
