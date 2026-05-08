import ContactClient from "./ContactClient"


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Contact Hindustan Drones | Talk to Drone Experts",
  description: "Contact Hindustan Drones for drone services, products, training and enterprise UAV solutions. Get expert support from our Hyderabad team.",
  alternates: {
    canonical: `${baseUrl}/contact-us`,
  },
}

export default function page() {
  return <ContactClient/>
}
