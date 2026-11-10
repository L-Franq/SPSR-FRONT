import "tailwindcss";

export default function ActiveUserStatus({ StatusDescription }) {
  return (
    <>
      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
      <i>{StatusDescription}</i>
    </>
  );
}
