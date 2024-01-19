import { Button, Card, Column, Container, Image, RowBetween, TextTitle, Touch } from "@components"
import { useAuth } from "@hooks"
import { useDepositMutation } from "@state/api/deposit"
import { theme } from "@utils"
import { useEffect } from "react"
import { Linking } from "react-native"

const DATA = [
  { title: '10 هزار سکه', value: 1000 },
  { title: '20 هزار سکه', value: 20000 },
  { title: '50 هزار سکه', value: 50000 },
  { title: '100 هزار سکه', value: 100000 },
]
const Deposit = () => {

  const [getbankURL, { isLoading, isError, isSuccess, data }] = useDepositMutation()
  const { user } = useAuth()


  function goToBank(amount: number) {

    getbankURL({ amount, userId: user._id })

  }

  useEffect(() => {
    if (isSuccess && data) {
      Linking.openURL(data.url)
    }
  }, [isSuccess])
  return (
    <Container>
      {DATA.map(item => (
        <Touch key={item.value}>
          <Card bgColor={theme.colors.success} py={25}>
            <RowBetween>
              <Button isLoading={isLoading} onPress={() => goToBank(item.value)} size="1/2" title={`${item.value} تومان`} />

              <TextTitle>{item.title}</TextTitle>


            </RowBetween>
          </Card>
        </Touch>
      ))}
    </Container>
  )
}

export default Deposit