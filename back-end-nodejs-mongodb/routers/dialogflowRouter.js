import {WebhookClient} from 'dialogflow-fulfillment';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import express from 'express'
import dialogflowFulfillment from 'dialogflow-fulfillment'

const dialogflowRouter = express.Router()

async function categoriesMen(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Muski satovi`,
                    "link": `http://localhost:3000/search/category/muski/material/sve/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}
async function categoriesWomen(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Zenski satovi`,
                    "link": `http://localhost:3000/search/category/zenski/material/sve/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}
async function materialGold(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Zlatni satovi`,
                    "link": `http://localhost:3000/search/category/sve/material/gold/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function materialOystersteel(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Celicni satovi`,
                    "link": `http://localhost:3000/search/category/sve/material/oystersteel/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryMenGold(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Muski satovi od zlata`,
                    "link": `http://localhost:3000/search/category/muski/material/gold/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryMenOystersteel(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Muski satovi od celika`,
                    "link": `http://localhost:3000/search/category/muski/material/oystersteel/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryWomenGold(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Zenski satovi od zlata`,
                    "link": `http://localhost:3000/search/category/zenski/material/gold/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryWomenOystersteel(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Zenski satovi od celika`,
                    "link": `http://localhost:3000/search/category/zenski/material/oystersteel/min/0/max/0/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryNajskupljiMuski(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Najskuplji muski satovi`,
                    "link": `http://localhost:3000/search/category/muski/material/sve/min/14000/max/30000/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryNajjeftinijiMuski(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Najjeftiniji muski satovi`,
                    "link": `http://localhost:3000/search/category/muski/material/sve/min/1/max/12000/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryNajskupljiZenski(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Najskuplji zenski satovi`,
                    "link": `http://localhost:3000/search/category/zenski/material/sve/min/14000/max/30000/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryNajjeftinijiZenski(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Najjeftiniji zenski satovi`,
                    "link": `http://localhost:3000/search/category/zenski/material/sve/min/1/max/12000/rating/1/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

async function queryNajboljeOcenjeni(agent){
    let payload = {
        "richContent": [
            [
                {
                    "type": "button",
                    "icon": {
                        "type": "watch",
                        "color": "goldenrod",
                    },
                    "text": `Najbolje ocenjeni satovi`,
                    "link": `http://localhost:3000/search/category/sve/material/sve/min/0/max/0/rating/4/order/lowest`,
                    "event": {
                        "name": "",
                        "languageCode": "",
                        "parameters": {},
                    }
                }
            ]
        ]
    }

    await agent.add(new dialogflowFulfillment.Payload(
        agent.UNSPECIFIED, payload, { sendAsMessage: true, rawPayload: true }
    ))
}

dialogflowRouter.post('/', express.json(), async(req, res) => {
    const agent = new dialogflowFulfillment.WebhookClient({
        request: req,
        response: res
    })

    let intentMap = new Map()
    intentMap.set("categories-men", categoriesMen)
    intentMap.set("categories-women", categoriesWomen)
    intentMap.set("material-gold", materialGold)
    intentMap.set("material-oystersteel", materialOystersteel)
    intentMap.set("query-men-gold", queryMenGold)
    intentMap.set("query-men-oystersteel", queryMenOystersteel)
    intentMap.set("query-women-gold", queryWomenGold)
    intentMap.set("query-women-oystersteel", queryWomenOystersteel)
    intentMap.set("query-najskuplji-muski", queryNajskupljiMuski)
    intentMap.set("query-najjeftiniji-muski", queryNajjeftinijiMuski)
    intentMap.set("query-najskuplji-zenski", queryNajskupljiZenski)
    intentMap.set("query-najjeftiniji-zenski", queryNajjeftinijiZenski)
    intentMap.set("query-najbolje-ocenjeni", queryNajboljeOcenjeni)

    agent.handleRequest(intentMap)
})

export default dialogflowRouter