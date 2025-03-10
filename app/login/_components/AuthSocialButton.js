function AuthSocialButton({ icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full justify-center bg-white text-accent-50 p-1.5 rounded-md"
    >
      <Icon size={20} />
    </button>
  );
}

export default AuthSocialButton;
