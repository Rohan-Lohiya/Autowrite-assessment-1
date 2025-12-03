import ProgressCircle from "./ProgressCircle";

export default function WelcomeCard() {
  return (
    <section className="mb-8 flex items-center justify-between px-8 py-7 ">
      <div>
        <p className="text-m text-[#9DA2B3] mb-1">Hello Sir,</p>
        <p className="font-semibold text-[16px] mb-1 text-black">
          Your agent has requested documents for your application.
        </p>
        <p className="text-sm text-[#7A7F8A] max-w-2xl">
          Simply add everything you have. We'll detect each document and mark what's still missing. Adding all documents
          will reduce the need to fill out additional information.
        </p>
      </div>

      <ProgressCircle percent={86} />
    </section>
  );
}
