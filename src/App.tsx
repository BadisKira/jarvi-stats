import './App.css'
import { SignedIn, SignedOut, useNhostClient } from '@nhost/react';
import { useQuery } from '@apollo/client';
import { getHisotyEntriesTypes } from './lib/queries';

function App() {

  const nhost = useNhostClient();
  console.log("nhost => ", nhost)
  const handleFormSubmit = async () => {
    const { error, session } = await nhost.auth.signIn({
      email:  import.meta.env.VITE_EMAIL,
      password: import.meta.env.VITE_PASSWORD
    });
    if (session) {
      console.log(session);
    } else {
      console.log(error);
    }
  }


  return (
    <>
      <SignedIn>
        <p>Yatta je me suis authentifié</p>
        <DisplayEntriesType />
      </SignedIn>
      <SignedOut>
        Je suis pas signedin
        <button onClick={handleFormSubmit}>
          SignIn
        </button>
      </SignedOut>
    </>
  )
}

export default App


function DisplayEntriesType() {
  const { loading, error, data } = useQuery(getHisotyEntriesTypes);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const {historyentries_types} = data;

  return historyentries_types.map((entry: {value:string}) => (
    <div key={entry.value}>
      <h3>{entry.value}</h3>
    </div>
  ));
}