import express from 'express'

import { tickets } from './data/tickets.js'

const PORT = 8000

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: "TicketFlow API"
    })
})

app.get('/api/tickets', (req, res) => {
    let filteredData = tickets
    const { status } = req.query

    const validStatus = ['open', 'in_progress', 'resolved']

    if (status !== undefined) {
        if (!validStatus.includes(status)
            || typeof status !== 'string'
        ) {
            res.status(400).json({
                message: 'Invalid ticket status'
            })
            return
        }

        filteredData = tickets.filter(
            ticket => ticket.status === status
        )
    }

    res.json(filteredData)
})

app.post('/api/tickets', (req, res) => {
    console.log(req.body)

    res.status(201).json({
        message: "Resource created"
    })
})

app.get('/api/tickets/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)
        || id <= 0
    ) {
        res.status(400).json({
            message: "Invalid ticket ID"
        })
        return
    }

    const matchingTicket = tickets.find(ticket => ticket.id === id)

    if (!matchingTicket) {
        res.status(404).json({
            message: "Ticket not found"
        })
        return
    }

    res.json(matchingTicket)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
