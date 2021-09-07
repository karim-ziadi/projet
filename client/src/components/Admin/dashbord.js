import React from 'react'
import { useDispatch , useSelector  } from "react-redux";
// const [state, setstate] = useState(initialState)


export default function Dashbord() {
    // const user = JSON.parse(localStorage.getItem("profile"));
// const[user,setUser]=useState()
    const user = useSelector((state) => state.user);
    
// console.log(user)
    return !user.role=="admin"? (
        <h1>Loading</h1>
    ):(
     <div className="dach"><button type="button" class="btn btn-primary">USERS</button>
     <button type="button" class="btn btn-success">POSTS</button>
     </div>
       
        )
    
}
