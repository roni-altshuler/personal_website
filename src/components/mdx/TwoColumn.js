export default function TwoColumn({ children }) {
  return (
    <div className="my-8 grid gap-6 md:grid-cols-2">
      {children}
    </div>
  );
}
