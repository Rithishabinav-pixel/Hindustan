import ServiceForm from '../../../../components/ServiceForm'

export default async function EditServicePage({ params }) {
  const { id } = await params
  return <ServiceForm serviceId={Number(id)} />
}
