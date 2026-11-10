import "tailwindcss";

export default function InactiveUserStatus({ StatusDescription }) {
  return (
    <>
      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
      <i>{StatusDescription}</i>
    </>
  );
}
