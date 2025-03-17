# Project Setup



To install dependencies and start the application, run the following commands in the terminal:
```bash
type in vscode terminal npm i -> npm run start




Brief Explanation of Design Decisions

-used expressjs routing
-used uuids for Order ids
-used http status codes for invalid quests


Assumptions Made
-The inventory is predefined at app startup and does not change dynamically.
-Canceled orders cannot be processed


List of API Endpoints and How to Use Them

## Create Order
POST http://localhost:3000/api/orders 
Req
{
  "customer": " Sample",
  "products": [
    { "id": "itemOne", "quantity": 2 },
    { "id": "itemTwo", "quantity": 1 },
    { "id": "itemThree", "quantity": 2 },
    { "id": "itemFour", "quantity": 1 }
  ]
}


Res

{
    "id": "c4f86379-9f32-4110-afbe-b12a5ddb1888",
    "customer": " Sample",
    "products": [
        {
            "id": "itemOne",
            "quantity": 2
        },
        {
            "id": "itemTwo",
            "quantity": 1
        },
        {
            "id": "itemThree",
            "quantity": 2
        },
        {
            "id": "itemFour",
            "quantity": 1
        }
    ],
    "status": "pending"
}


## Get All Orders

GET http://localhost:3000/api/orders 

Res
[
    {
        "id": "52a29083-732d-490c-8a5f-66f730f81cc8",
        "customer": " Sample",
        "products": [
            {
                "id": "itemOne",
                "quantity": 2
            },
            {
                "id": "itemTwo",
                "quantity": 1
            },
            {
                "id": "itemThree",
                "quantity": 2
            },
            {
                "id": "itemFour",
                "quantity": 1
            }
        ],
        "status": "processed"
    },
    {
        "id": "22afd20c-78a4-4639-b804-bd947b828469",
        "customer": " Sample",
        "products": [
            {
                "id": "itemOne",
                "quantity": 2
            },
            {
                "id": "itemTwo",
                "quantity": 1
            },
            {
                "id": "itemThree",
                "quantity": 2
            },
            {
                "id": "itemFour",
                "quantity": 1
            }
        ],
        "status": "pending"
    }
]


## Get Specific Order

GET http://localhost:3000/api/orders/ed47eaa3-a363-467e-a3cf-ca322172c0bf




## Delete Order

DELETE http://localhost:3000/api/orders/9f7e0862-0fb9-4a56-90b0-db88246c6294

Res
{
    "message": "Order canceled",
    "order": {
        "id": "9f7e0862-0fb9-4a56-90b0-db88246c6294",
        "customer": " Sample",
        "products": [
            {
                "id": "itemOne",
                "quantity": 2
            },
            {
                "id": "itemTwo",
                "quantity": 1
            },
            {
                "id": "itemThree",
                "quantity": 2
            },
            {
                "id": "itemFour",
                "quantity": 1
            }
        ],
        "status": "canceled"
    }
}


## Process order

POST http://localhost:3000/api/process-next-order




 