export default async function Dashboard({ user }: { user: CustomUser }) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        {user?.name} - {user?.email} - {user?.memberSince}
      </p>
    </div>
  );
}
