interface DocumentLayoutPageProps {
  children: React.ReactNode;
}

export default function DocumentLayoutPage({
  children,
}: DocumentLayoutPageProps) {
  return <div>{children}</div>;
}
