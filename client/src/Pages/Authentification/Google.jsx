import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import FireBaseSocialIcons from "./components/FirebaseSocialIcons";
import { login, register } from "../../redux/actions/AuthAction";
import { useDispatch } from "react-redux";
import AlertContainer from "../../Components/alerts";

function useRegister() {
  const dispatch = useDispatch();
  return async function (data) {
    const result = await dispatch(register(data));
    return result;
  };
}

function useLogin() {
  const dispatch = useDispatch();
  return async function (data) {
    const result = await dispatch(login(data));
    return result;
  };
}

function GoogleSignIn({ mode }) {
  const registerUser = useRegister();
  const loginUser = useLogin();
  const [isActionCompleted, setIsActionCompleted] = useState(false);

  useEffect(() => {
    const loadGoogleAPI = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            clientId:
              "1041121037783-0v6qens1p1re6a799f95livnuf6ci5af.apps.googleusercontent.com",
            scope:
              "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.phonenumbers.read",
            plugin_name: "WyPlay",
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest"],
          })
          .then(() => {
            console.log("Google API client initialized");
          })
          .catch((error) => {
            console.log("Error initializing Google API client:", error);
          });
      });
    };

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => loadGoogleAPI();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchProfileInfo = () => {
    gapi.client.people.people
      .get({
        resourceName: "people/me",
        personFields: "names,emailAddresses,phoneNumbers,addresses",
      })
      .then(async (response) => {
        console.log("Profile:", response.result);
        const profile = response.result;
        const firstName = profile.names[0].givenName;
        const lastName = profile.names[0].familyName;
        const email = profile.emailAddresses[0].value;
        const phoneNumber =
          profile.phoneNumbers && profile.phoneNumbers[0].value;
        const address =
          profile.addresses && profile.addresses[0].formattedValue;
        console.log("Phone number:", phoneNumber);
        console.log("Address:", address);

        if (mode == "register") {
          const data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: "zzzzzzzzzzzzzzzzzz",
          };
          data.role = "user";
          console.log(data);

          const result = await registerUser(data);
          setIsActionCompleted(true);
          console.log(result);
        } else if (mode == "login") {
          const data = {
            email: email,
            password: "zzzzzzzzzzzzzzzzzz",
          };
          const result = await loginUser(data);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          console.log(result);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };

  const handleSignIn = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(
        (user) => {
          console.log("Signed in successfully:", user);
          fetchProfileInfo();
        },
        (error) => {
          console.log("Error signing in:", error);
        }
      );
  };

  return (
    <div>
      {isActionCompleted && <AlertContainer />}
      <FireBaseSocialIcons handleSignIn={handleSignIn} />
    </div>
  );
}

export default GoogleSignIn;
