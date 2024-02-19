import { Card, Container, RowBetween, TextTitle, Touch } from '@components';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FinancialScreenNavigationProp } from '@navigation/utils/types';
import { useNavigation } from '@react-navigation/core';
import { theme } from '@utils';
import { Icon } from 'native-base';
import React from 'react';

const List = [
  { title: 'خرید سکه', link: 'Deposit' },
  { title: 'فروش سکه', link: 'Cashout' },
  { title: 'اطلاعات مالی', link: 'Credit' },
] as const

const Entry = () => {
  const { navigate } = useNavigation<FinancialScreenNavigationProp>()

  return (
    <Container hasBack>

      {List.map(item => (
        <Touch onPress={() => navigate(item.link)} key={item.link}  >
          <Card bgColor={theme.colors.info} py={25}>
            <RowBetween>
              <Icon color='text.light' as={SimpleLineIcons} name='arrow-left' />
              <TextTitle color='text.light'  >
                {item.title}
              </TextTitle>
            </RowBetween>
          </Card>
        </Touch>
      ))}
    </Container>
  )

}

export default Entry