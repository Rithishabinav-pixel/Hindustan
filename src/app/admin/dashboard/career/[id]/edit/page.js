import CareerForm from '../../../../components/CareerForm'

export default function EditCareerPage({ params }) {
  return <CareerForm careerId={params.id} />
}
