function WebsiteHeader() {
    const isLogged = localStorage.getItem("user");
    const logout = async () => {
        const response = await fetch("/api/securewebsite/logout", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.removeItem("user");

            alert(data.message);

            document.location = "/login";
        } else {
            console.log("could not logout: ", response);
        }
    };

  return (
      <div className='top-nav'>
          {
              isLogged ?
                  <span className='item-holder'>
                      <a href="/">Home</a>
                      <a href="/admin">Admin</a>
                      <span onClick={logout}>Log Out</span>
                  </span> :
                  <span className='item-holder'>
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </span>
          }
      </div>
  );
}

export default WebsiteHeader;