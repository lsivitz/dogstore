export async function createLabel(orderId: number) {
  // TODO: integrate with Shippo or Printful
  console.log('create shipping label for', orderId)
}

export function parseTrackingWebhook(payload: any) {
  // TODO: parse provider webhook
  return {
    trackingNumber: payload.tracking_number,
    status: payload.status,
  }
}
