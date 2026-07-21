import TutorWrapper from "./dashboard/tutorWrap";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TutorWrapper>{children}</TutorWrapper>;
}
