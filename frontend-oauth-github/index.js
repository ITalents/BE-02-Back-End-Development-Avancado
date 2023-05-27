import qs from "query-string";
import axios from "axios";
import Cookies from "js-cookie";

function alterPage(type) {
  if (type === "home") {
    document.querySelector(".home").classList.remove("d-none");
    document.querySelector(".signin-page").classList.add("d-none");
  } else {
    document.querySelector(".home").classList.add("d-none");
    document.querySelector(".signin-page").classList.remove("d-none");
  }
}

function redirectToGithub() {
  const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
  const params = {
    response_type: "code",
    scope: "user public_repo",
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URL,
  };

  const queryStrings = qs.stringify(params);
  const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
  window.location.href = authorizationUrl;
}

async function getGithubToken(code) {
  if (code) {
    try {
      const response = await axios.post(
        `${process.env.BACK_END_URL}/auth/signin-github`,
        {
          code,
        }
      );
      const { token } = response.data;
      Cookies.set("tokenGithub", token);
      alterPage("home");
      getUser(token);
    } catch (err) {
      const alert = document.querySelector(".alert-signin");
      alert.classList.add("alert-danger");
      alert.innerHTML = "Erro ao entrar com o GitHub, tente novamente!";
      console.log("err", err);
    }
  }
}

async function getUser(token) {
  try {
    const response = await axios.get(`${process.env.BACK_END_URL}/users/null`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    document.querySelector(".welcome").innerHTML = `Olá, ${user.name}`;
    document
      .querySelector(".card-img-top")
      .setAttribute("src", `${user.image}`);
  } catch (err) {
    const alert = document.querySelector(".alert-home");
    alert.classList.add("alert-danger");
    alert.innerHTML = "Erro ao buscar usuário!";
    console.log("err", err);
  }
}

function signout() {
  Cookies.remove("tokenGithub");
  Cookies.remove("user");
  alterPage("signin");
}

window.onload = () => {
  document.querySelector(".signin").addEventListener("click", redirectToGithub);
  document.querySelector(".signout").addEventListener("click", signout);

  const { code } = qs.parseUrl(window.location.href).query;
  getGithubToken(code);
};
