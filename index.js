import express from 'express'
import {StatusCodes} from 'http-status-codes' 
const app = express()

const PORT = process.env.PORT || 3000
let users = [
{id: 1,name: 'rafael ribeiro', age: 31},
{id: 2, name: 'gabriel custodio', age: 27},
]
app.use(express.json())
app.listen(PORT, ()=>{
  console.log(`servidor rodando em http://localhost:${PORT}`)
})

app.get('/', (request, response)=>{
  return response.send('<h1>trabalhando com servidor express')
})

app.get('/users',(request, response)=>{
  return response.send(users)
})

app.get('/users/:userId', (request, response)=>{
  const userId = request.params.userId
  const user = users.find(user =>{
    return (user.id === Number(userId))
  })  
  return response.send(user)
})

app.post('/users', (request, response)=>{
  const newUser = request.body
  users.push(newUser)
return response.status(StatusCodes.CREATED).send(newUser)
})

app.put('/users/:userId',(request, response)=>{
const userId = request.params.userId
const updateUser = request.body
users = users.map(user =>{
  if(Number(userId)===user.id){
    return updateUser
}
  return user
})

  return response.send(updateUser)
})

app.delete('/users/:userId', (response, request)=>{
    const userId = request.params.userId
    users = users.filter((user)=> user.id !== Number(userId))
return response.status(StatusCodes.NO_CONTENT).send()
})

