import json

from fastapi import HTTPException

def create_delivery(state, event):
  data = json.loads(event.data)
  return {
    "id": event.delivery_id,
    "budget": int(data["budget"]),
    "notes": data["notes"],
    "status":"ready"
  }
  
def start_delivery(state, event):
  return state | {
    "status": "active"
  }
  
def pickup_products(state, event):
  data = json.loads(event.data)
  new_budget = state["budget"] - int(data['purchase_price']) * int(data['quantity'])

  if new_budget < 0:
      raise HTTPException(status_code=400, detail="Not enough budget")

  return state | {
      "budget": new_budget,
      "purchase_price": int(data['purchase_price']),
      "quantity": int(data['quantity']),
      "status": "collected"
  }

CONSUMERS = {
  "CREATE_DELIVERY":create_delivery,
  "START_DELIVERY":start_delivery,
  "PICKUP_PRODUCTS":pickup_products 
}