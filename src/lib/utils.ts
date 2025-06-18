import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  // If price is over 100,000, assume it's in Kenya Shillings
  if (price >= 100000) {
    return `KSh ${price.toLocaleString()}`
  }
  // Otherwise, assume it's in USD
  return `$${price.toLocaleString()}`
}
