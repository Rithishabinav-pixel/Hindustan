import CaseStudyForm from '../../../../components/CaseStudyForm'

export default async function EditCaseStudyPage({ params }) {
  const { id } = await params
  return <CaseStudyForm caseStudyId={id} />
}
