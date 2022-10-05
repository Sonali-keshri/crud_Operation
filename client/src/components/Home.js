import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";

const Home = () => {
  const [getUserdata, setGetUserdata] = useState([]);
  console.log(getUserdata);

  const getdata = async (e) => {
    // e.preventDefault();

    const res = await fetch(
      "https://merncrud-operation.herokuapp.com/getdata",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error ");
    } else {
      setGetUserdata(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const deleteuser = async (id) => {
    const res2 = await fetch(
      `https://merncrud-operation.herokuapp.com/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      alert("error");
      console.log("error ");
    } else {
      console.log("user deleted");
      toast.error("User deleted", toastOptions);
      getdata();
    }
  };

  return (
    <>
      <div className="mt-3">
        <div className="container">
          <div className="add_Btn mt-3 mb-3">
            <button className="btn btn-primary">
              <Link to="/register" className="addlink">
                Add data
              </Link>
            </button>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getUserdata.map((element, id) => {
                return (
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex justify-content-between ">
                      <Link to={`view/${element._id}`}>
                        <button className="btn btn-success button">
                          <VisibilityIcon />
                        </button>
                      </Link>
                      <Link to={`edit/${element._id}`}>
                        <button className="btn btn-primary button">
                          <EditIcon />
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger button"
                        onClick={() => deleteuser(element._id)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
