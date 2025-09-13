export default function Button({ children, className='', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={"inline-flex items-center justify-center rounded-2xl px-4 py-2 border bg-slate-900 text-white hover:opacity-90 " + className} {...props}>{children}</button>;
}
