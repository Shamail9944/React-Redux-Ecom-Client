export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function   fetchProductByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart?user=' + userId)
    const data = await response.json()
    resolve({ data })
  });
}

export function updateCart(updateitem) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + updateitem.id, {
      method: "PATCH",
      body: JSON.stringify(updateitem),
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()
    resolve({ data: { id: itemId } })
  });
}

export function clearCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchProductByUserId(userId)
    const items = response.data
    for (let item of items) {
      await deleteCartItem(item.id)
    }
    resolve({ status: "success" })
  });
}