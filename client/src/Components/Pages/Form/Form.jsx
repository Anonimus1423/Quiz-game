import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../../styles/styles'
import Header, { Button, ButtonInnerText } from '../../Main-Components/Header'
import { sendForm } from '../../../hooks/useUser'

const Title = styled.h2`
    font-size: 36px;
    margin-top: 100px;
    text-align: center;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainTextColor};
    margin-bottom: 50px;
`
const FormComponent = styled.form`
    position: relative;
    width: 400px;
    left: 50%;
    display: inline-block;
    transform: translateX(-50%);
`
const Input = styled.input`
    display: block;
    color: ${({ theme }) => theme.colors.mainTextColor};
    width: 100%;
    border: none;
    font-size: 0.9rem;
    outline: none !important;
    padding: 7px 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondColor};

`
const Label = styled.label` 
    font-size: 1.1rem;
    display: block;
    color: ${({ theme }) => theme.colors.mainTextColor};
    font-weight: 600;
    margin-top: 25px;
    margin-bottom: 3px;
`
const ThisButton = styled.button` 
    padding: 12px 27px;
    border-radius: 6px;
    border: none;
    outline: none !important;
    letter-spacing: -0.005em;
    text-decoration: none !important;
    overflow: hidden;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.secondColor};
    margin-right: 15px;
    position: relative;
    font-weight: 600;
    margin-top: 25px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondTextColor};
`
const InputDiv = styled.div` 

`
const Error = styled.div` 
    font-weight: 600;
    margin-top: 25px;
    color: ${({theme}) => theme.colors.thirdColor};
`

export default function Form({login}) 
{
    const [form, setForm] = useState(
    {
        email: "",
        username: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [next, setNext] = useState(false)
    console.log(error);
    const changeForm = e => 
    {
        setForm(form => ({...form, [e.target.name]: e.target.value }))
    }
    if(!login)
    {
        return (
            <Container>
                <Header />
                <FormComponent onSubmit={e => sendForm(e)(form, setError, setNext)}>
                    <Title>Registration</Title>
                    <InputDiv>
                        <Label htmlFor='email'>Email</Label>
                        <Input name="email" onChange={e => changeForm(e)} id='email' placeholder='Write your email.'/>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor='username'>Username</Label>
                        <Input name="username" onChange={e => changeForm(e)} id='username' placeholder='Write your username.' />
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor='password'>Password</Label>
                        <Input name="password" onChange={e => changeForm(e)} id='password' placeholder='Write your password.' />
                    </InputDiv>
                    <Error>{ error }</Error>
                    <ThisButton>Sign in</ThisButton>
                </FormComponent>
            </Container>
        )
    }
    else
    {
        return (
            <Container>
                <Header />
                <FormComponent>
                    <Title>Log In</Title>
                    <InputDiv>
                        <Label htmlFor='email'>Email or username</Label>
                        <Input name="email" onChange={e => changeForm(e)} id='email' placeholder='Write your email or username.'/>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor='password'>Password</Label>
                        <Input name="password" onChange={e => changeForm(e)} id='password' placeholder='Write your password.' />
                    </InputDiv>
                    <ThisButton>Sign up</ThisButton>
                </FormComponent>
            </Container>
        )
    }
}
