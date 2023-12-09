import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className="font-sans ">{children}</section>;
}
