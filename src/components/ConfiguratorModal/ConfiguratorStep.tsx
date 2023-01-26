import React, { ReactNode } from "react";
import {getClassNames} from "../../utils/classNameUtils";

type ConfigurationStepProps = {
    stepTitle: string,
    className : string,
    children: ReactNode,
    hidden: boolean,
    stepNumber: number

}

const ConfigurationStep = ({
                        stepTitle,
                        hidden = true,
                        children,
    stepNumber,
                    } : ConfigurationStepProps) => {

    return (
        <div className={`step ${hidden ? 'hidden' : ''}`}>
            <h4 className="title title-l">
                <span className="total">Korak{stepNumber}.</span> {stepTitle}</h4>
            {children}

        </div>
    );
};


export default ConfigurationStep;
