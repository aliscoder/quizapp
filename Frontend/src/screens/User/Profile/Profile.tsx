import { Avatar, Button, Column, Container, TextTitle } from '@components'
import { useAuth } from '@hooks'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
const {logout, user} = useAuth()

  return (
    <Container>
        <Column alignItems='center' justifyContent='center' h='full' space={5}>
        <Avatar size='2xl' uri={user?.avatar?.url} />
        <TextTitle>{user.username}</TextTitle>
        <TextTitle>{user.coin} سکه</TextTitle>
        <Button title='خروج' w='2/3' scheme='danger' onPress={logout} />
        </Column>
    </Container>
  )
}

export default Profile