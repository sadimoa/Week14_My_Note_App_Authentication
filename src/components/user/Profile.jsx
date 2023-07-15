import { useGetUserQuery } from "../../store/api/UserSlice";

const Profile = () => {
  const { data: user = {} } = useGetUserQuery();


  return (
      <div className="mx-auto rounded-lg mt-20 mb-20 bg-gray-100 p-10 shadow md:w-3/4 lg:w-1/2">
        <h4 className="mb-10 text-2xl font-bold">Profile</h4>
        <p className="mb-10 text-2xl">Name: {user.name} </p>
        <p className="mb-10 text-2xl">Email: {user.email} </p>
      </div>
  );
};

export default Profile;