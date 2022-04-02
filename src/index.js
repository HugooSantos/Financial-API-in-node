const express = require("express")
const {v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const customers = []

function verifyExistsAccountCpf(request, response , next){
    const { cpf } = request.headers
    const customer = customers.find(custumer => custumer.cpf === cpf)
        
    if(!customer){
        return response.status(400).json({
            error: "customer not found."
        })    
    }
    request.customer = customer
    return next()

}

app.post("/account", (request, response) => {
    const {cpf , name} = request.body
  
    const customersAlreadyExists = customers.some((customer)=> customer.cpf === cpf)

    if(customersAlreadyExists){
        return response.status(400).json({
            error: "customer already exists."
        })
    }

    
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).send()
})

app.get("/statement",verifyExistsAccountCpf ,(request,response)=>{
    
    const { customer } = request
    return response.json(customer.statement)
})

app.post("/deposit", verifyExistsAccountCpf , (request, response) ={
     const {description, amount} = request.body
})

app.listen(3001)

