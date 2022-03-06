import React from 'react'
import styled from 'styled-components'
import { Container } from '../../../../styles/styles'
import Test from './Test'
import { TitleComponent } from './Title.jsx'

const TestsComponent = styled.div` 
    background-color: ${({ theme }) => theme.colors.secondColor};
    & > div
    {
        display: flex;
        padding: 30px 0px;
        padding-top: 0;
        padding-bottom: 50px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
`
const NewTitle = styled(TitleComponent)`
  padding-top: 30px;
  padding-bottom: 15px;
`

export default function Tests() {
  return (
    <TestsComponent>
        <NewTitle>Most Popular Quiz</NewTitle>
        <Container>
            <Test title="React Question" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Question about armenia" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Best Question" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Fast fizik Text" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Test your soft skills" subTitle="Simply dummy text of the printing and typesettings."></Test>
            <Test title="Programer Test" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Testing your mathemathiks" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
            <Test title="Question About Biology" subTitle="Lorem Ipsum is simply dummy text of the printing and."></Test>
        </Container>
    </TestsComponent>
  )
}
