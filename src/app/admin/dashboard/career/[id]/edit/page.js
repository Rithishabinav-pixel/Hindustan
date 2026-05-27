import CareerForm from '../../../../components/CareerForm';

export default async function EditCareerPage({ params }) {

  const { id } = await params;

  return <CareerForm careerId={id} />
}