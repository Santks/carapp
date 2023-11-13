import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist() {

    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    const columns = [
        { field: "brand" },
        { field: "model" },
        { field: "color" },
        { field: "fuel" },
        { field: "year" },
        { field: "price" },
        {
            field: "Actions",
            cellRenderer: row => <EditCar car={row.data} updateCar={updateCar} />,
        },
        {
            cellRenderer: params =>
                <Button color="error" onClick={() => {
                    deleteCar(params)
                }}  >
                    Delete
                </Button>
        },

    ]

    useEffect(() => getCars(), [])

    const rest_url = "https://carrestapi.herokuapp.com/cars";
    const getCars = () => {
        fetch(rest_url)
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error));
    }

    const deleteCar = (params) => {
        console.log(params.data._links.car.href)
        fetch(params.data._links.car.href, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    setMsg("Car has been deleted successfully!");
                    setOpen(true);
                    getCars();
                } else {
                    alert("Something went wrong!")
                }
            })
            .catch(error => console.error(error))
    }

    const addCar = (car) => {
        //REST API call
        alert("Adding car to database")
        fetch(rest_url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok)
                    getCars();
                else
                    alert("Something went wrong while trying to add new car")
            })
            .catch(err => console.error(err))
    }

    const updateCar = (car, rest_url) => {
        //REST API call
        alert("Car updated")
        fetch(rest_url, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok)
                    getCars();
                else
                    alert("Something went wrong while trying to update car")
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material"
                style={{ height: "700px", width: "95%", margin: "auto" }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10} >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg} >

                </Snackbar>
            </div>
        </>
    )
}

export default Carlist;