import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";

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
            cellRenderer: params =>
                <Button color="error" onClick={() => {
                    deleteCar(params)
                }}  >
                    Delete
                </Button>
        }
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

    return (
        <>
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