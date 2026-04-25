import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="flex  gap-3 mr-3">
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className=" text-black font-semibold "
        >
          Login
        </button>
      ) : (
        <>
          <span className="text-sm">{user.name}</span>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className=" text-red-500 font-semibold "
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;