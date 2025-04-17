import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors['base-card']};
  padding: 1.5rem;
  border-radius: 8px;
`

const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
`

const Options = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.purple};
  border-radius: 6px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors['purple-light'] : theme.colors['base-button']};
  color: ${({ theme }) => theme.colors['base-text']};
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors['purple-light']};
  }
`

interface PaymentOption {
  label: string
  value: string
  tax: number
}

const paymentMethods: PaymentOption[] = [
  { label: 'Cartão de Crédito', value: 'credit', tax: 3.85 },
  { label: 'Cartão de Débito', value: 'debit', tax: 1.85 },
  { label: 'Pix ou Dinheiro', value: 'pix', tax: 0 },
]

interface PaymentMethodSelectorProps {
  onChange: (method: PaymentOption) => void
}

export function PaymentMethodSelector({ onChange }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentOption>(paymentMethods[2])


  useEffect(() => {
    onChange(selectedMethod)
  }, [selectedMethod, onChange])

  return (
    <Container>
      <Title>Pagamento</Title>
      <p style={{ marginBottom: '1rem' }}>O pagamento é feito na entrega. Escolha a forma que deseja pagar:</p>
      <Options>
        {paymentMethods.map(method => (
          <Button
            key={method.value}
            selected={selectedMethod.value === method.value}
            onClick={() => setSelectedMethod(method)}
          >
            {method.label}
          </Button>
        ))}
      </Options>
    </Container>
  )
}
