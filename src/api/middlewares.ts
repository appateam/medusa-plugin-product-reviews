import {
  requireCustomerAuthentication,
  type MiddlewaresConfig,
} from "@medusajs/medusa"

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store/products/[id]/reviews",
      method: "POST",
      middlewares: [requireCustomerAuthentication()],
    },
  ],
}
