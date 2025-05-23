export async function sendOrderConfirmation(to: string, orderId: number) {
  // TODO: integrate with Resend or Postmark
  console.log(`send order confirmation to ${to} for order ${orderId}`)
}

export async function sendShippingUpdate(to: string, trackingUrl: string) {
  // TODO: integrate with Resend or Postmark
  console.log(`send shipping update to ${to}: ${trackingUrl}`)
}
