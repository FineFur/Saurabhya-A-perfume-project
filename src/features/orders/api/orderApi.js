export async function getMyOrders() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/orders/my-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();

  return data;
}