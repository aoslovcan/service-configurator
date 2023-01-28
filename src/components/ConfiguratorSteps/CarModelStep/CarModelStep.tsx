import React from "react";
import ConfiguratorStep from "../../../common/ConfiguratorModal/ConfiguratorStep";
import Form from "../../../common/Form/Form";
import carModels from "../../../data/carBrand.json";

const CarModelStep = () => {

    const handleOnClick = (e : React.MouseEvent<HTMLInputElement>) => {
        console.log((e.target as HTMLInputElement).value)
    }

    return(
        <ConfiguratorStep
            stepTitle="Odaberite proizvođaća vašeg vozila"
            className="step"
            hidden={false}
            stepNumber={1}
        >
        <div className="car-modal-step" data-testid="car-model-step">
            <Form orientation="row" >
                {carModels.cars.map(({ id, name }) => (
                <div key={id} className="form-group">
                    <input
                        onClick={(e) => handleOnClick(e)}
                        type="radio"
                        id="carModel"
                        value={name}
                    />
                    <label htmlFor="html">{name}</label>
                </div>
                ))}
            </Form>
        </div>
        </ConfiguratorStep>
    )
}

export default CarModelStep;
