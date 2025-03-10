import AuthForm from './_components/AuthForm';

function Page() {
  return (
    <div className="w-full fixed top-16 md:top-24 bottom-[-8rem] right-0 overflow-y-scroll mb-32 scrollbar-none">
      <AuthForm />
    </div>
  );
}

export default Page;
