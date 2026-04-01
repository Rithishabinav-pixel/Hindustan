import Header from "@/app/components/Header";
import { prisma } from "@/lib/prisma";
import CareerDetailClient from "./CareerDetailClient";

export default async function CareerDetailPage({ params }) {
  const { slug } = await params;

  console.log("[CareerDetail] Slug:", slug);

  const career = await prisma.career.findUnique({
    where: { slug },
  });

  console.log("[CareerDetail] Career found:", career ? career.jobTitle : "null");

  if (!career) {
    return (
      <>
        <Header />
        <section style={{ padding: "190px 20px 80px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>Job Not Found</h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            This position is no longer available or the link is incorrect.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <CareerDetailClient career={career} />
    </>
  );
}
