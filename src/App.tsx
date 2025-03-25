import { Deluxe } from "./componets/Deluxe"
import "./App.css"

export function App() {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6IjYyMjRDNEM3LUE5MjUtNDAyRi1BMTY3LUQ0MkFDMzk1RDVDNCIsImFtb3VudCI6MjYuMDUsImN1c3RvbWVyIjp7ImZpcnN0TmFtZSI6IkphbWVzIiwibGFzdE5hbWUiOiJCb25kIiwiYmlsbGluZ0FkZHJlc3MiOnsiYWRkcmVzcyI6IjIwIHN0cmVldCBhZGRyZXNzIiwiY2l0eSI6IkRhbGxhcyIsInN0YXRlIjoiVFgiLCJ6aXBDb2RlIjoiNTAwNTQiLCJjb3VudHJ5Q29kZSI6IlVTQSJ9fX0.LuZ9WRYK4RLAcHwiHzhG7T-vnlsmWXaNF3ZlEq7-LCU"
    return (
        <div>
            <div> hey hey</div>
            <Deluxe jwt={jwt}/>
        </div>
    )
}

export default App
