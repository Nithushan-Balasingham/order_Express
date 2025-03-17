import { v4 as uuidv4 } from "uuid";

const invetory = {
  itemOne: { name: "Laptop", quantity: 10 },
  itemTwo: { name: "Mobile", quantity: 4 },
  itemThree: { name: "PC", quantity: 15 },
  itemFour: { name: "Headset", quantity: 2 },
  itemFive: { name: "Charger", quantity: 7 },
};

const orderList = [];
const orderListQueue = [];

export const createOrder = (req, res) => {
  const { customer, products } = req.body;
  if (!customer || !products || !Array.isArray(products)) {
    return res.status(400).json({ error: "Invalid Order details" });
  }

  for (let item of products) {
    if (!invetory[item.id] || invetory[item.id].quantity < item.quantity) {
      return res
        .status(400)
        .json({ error: `Product ${item.id} is out of stock or insufficient` });
    }
  }

  products.forEach((item) => (invetory[item.id].quantity -= item.quantity));
  const order = { id: uuidv4(), customer, products, status: "pending" };
  orderList.push(order);
  orderListQueue.push(order);

  res.status(201).json(order);
};

export const getOrders = (req, res) => {
  if (orderList.length === 0)
    return res.status(404).json({ message: "No Orders Found" });

  try {
    res.json(orderList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error });
  }
};

export const getSingleOrder = (req, res) => {
  try {
    const order = orderList.find((ord) => ord.id === req.params.id);
    if (!order) return res.status(404).json({ message: "No Order Found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order", details: error });
  }
};

export const deleteOrder = (req, res) => {
  try {
    const order = orderList.find((ord) => ord.id === req.params.id);
    if (!order) return res.status(404).json({ message: "No Order Found" });
    if (order.status === "processed")
      return res
        .status(500)
        .json({ message: "Cannot cancel the order due to processed" });
    order.status = "canceled";
    res.json({ message: "Order canceled", order });
  } catch (error) {}
};

export const processOrder = (req, res) => {
  try {
    if (orderListQueue.length === 0) {
      return res.json({ message: "No orders to process" });
    }

    let processedOrder = null;

    while (orderListQueue.length > 0) {
      const order = orderListQueue.shift();

      if (order.status === "canceled") {
        continue;
      }
      order.status = "processed";
      processedOrder = order;
      break;
    }

    if (processedOrder) {
      return res.json({ message: "Order processed", order: processedOrder });
    } else {
      return res.json({ message: "No orders to process" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
