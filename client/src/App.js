import { useState , useEffect} from 'react';
import axios from 'axios';


function App() {
  const [users,setUsers] = useState([]);

  //fetch the users
  useEffect(()=>{
    axios.get('http://localhost:5000/api/users').then((response)=>{
      setUsers(response.data.data);
    }).catch((error)=>{
      console.error("There was an error fetching the users!",error);
    });
  },[]);

  return (
    <>
      <h1>Users</h1>
      <div>
        {users.map((user)=>(
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
