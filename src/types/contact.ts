export interface ContactData {
  name: string
  email: string
  message: string
  website?: string // Honeypot field - should always be empty for real users
}

export interface ContactResponse {
  success: boolean
  message: string
}
