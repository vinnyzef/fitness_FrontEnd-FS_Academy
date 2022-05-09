export const LogInUser = async (username, password) => {
    return await fetch(
        'http://fitnesstrac-kr.herokuapp.com/api/users/login',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.username);
        return result.user.username;
      })
      .catch(console.error);
  };
  
  export const SignUpUser = async (username, password) => {
    await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.username);
      })
      .catch(console.error);
  };
  