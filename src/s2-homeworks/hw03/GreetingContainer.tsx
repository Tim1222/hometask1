import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'
import {log} from "util";


// * 4 - в файле GreetingContainer.tsx дописать типизацию пропсов
// * 5 - в файле GreetingContainer.tsx указать нужные типы в useState с name и error
// * 6 - в файле GreetingContainer.tsx дописать тип и логику функции setNameCallback
// * 7 - в файле GreetingContainer.tsx дописать логику функций pureAddUser, pureOnBlur, pureOnEnter и проверить их тестами
// * 8 - в файле GreetingContainer.tsx вычислить количество добавленных и имя последнего (totalUsers, lastUserName)
// * 9 - в файле Greeting.tsx дописать типизацию пропсов


type GreetingContainerPropsType = {
    users: UserType[] // need to fix any ***
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: (error: string)=> void, setName: (name: string) => void, addUserCallback: (name: string) => void) => {
   // const trimmedName = e.currentTarget.value.type()

    if (name.trim() === '') {
        setError('Ошибка! Введите имя!');
    } else {
        addUserCallback(name)
        setName('')
        setError('')
    }



    // if (trimmedName) {
    //     setName(trimmedName)
    //     setError('')
    // } else {
    //     setName('')
    //     setError('Name is required')
    // }
    // если имя пустое - показать ошибку: setError('Ошибка! Введите имя!'),
    // иначе - добавить юзера при помощи addUserCallback и очистить инпут засетав ''
    // проверить на пустоту можно при помощи метода trim(). К примеру: name.trim() !== ''
    // ЕСЛИ НЕ БУДЕТ ПОЛУЧАТЬСЯ, НЕ РАССТРАИВАЙСЯ. НА ЧЕТВЕРТОМ ЗАНЯТИИ ПО ТУДУЛИСТУ НАУЧИМ), НО ВСЕ ТАКИ ПОПЫТАЙСЯ))
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => { // если имя пустое - показать ошибку
    if (name.trim() === '') {
   setError('Ошибка! Введите имя!')
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => { // если нажата кнопка Enter - добавить
    if (e.key === "Enter" ) {
        addUser()
    }

}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // ***need to fix any
    const [error, setError] = useState<string>('') // ***need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix
        error && setError('')
    }
    const addUser = () => {
        // это всего лишь функция стрелочник- она всего лишь получает
        //сигнал из компоненты <Greeting/> и вызывает pureAddUser (с кучей аргументов)
        // ЗДЕСЬ НИЧЕГО ПИСАТЬ НЕ НУЖНО-ВСЕ ОК

        pureAddUser(name, setError, setName, addUserCallback)

    }
    const onBlur = () => {
        // все тоже самое, что и в addUser -функция стрелочник
        // всего лишь получает сигнали из компоненты <Greeting/> и вызывает pureOnBlur (с кучкой аргументов)
        pureOnBlur(name, setError)
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        // и здесь все тоже самое...)
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix
    const lastUserName = totalUsers > 0 ? users[users.length -1].name : '' // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
