import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

function EditCar(props) {

    const [car, setCar] = useState(props.car);

    const [open, setOpen] = useState(false);   //Dialog open state

    const handleClose = (event, reason) => {
        if (reason !== "backdropClick")
            setOpen(false);
    }

    const handleInputChange = (event) => {

        setCar({ ...car, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        props.updateCar(car, props.car._links.car.href);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Edit car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Fuel"
                        name="fuel"
                        value={car.fuel}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={car.year}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={car.price}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar;