import React from 'react';
import Typography from '@mui/material/Typography';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';

interface Steps {
  element: React.ReactNode;
  label: string;
}

interface StepperProps {
  steps: Steps[];
}

{/* <Link
      key={`submit-${title}`}
      to={submit.href}
      onClick={submit?.func}
      style={{ textDecoration: 'none' }}
    >
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        Confirm
      </Button>
    </Link>
    <Link id={`cancel-${title}`} to={cancel.href} style={{ textDecoration: 'none' }}>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 2 }}>
        {cancel.msg}
      </Button> */}

const BillStepper = (props: StepperProps) => {
  const { steps } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const handle_next = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handle_back = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handle_reset = () => setActiveStep(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handle_reset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <>
            {steps[activeStep].element}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" onClick={handle_back} sx={{ mr: 1 }}>
                {activeStep === 0 ? 'Cancel' : 'Back'}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handle_next}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        </React.Fragment>
      )}
    </Box>
  );
};

export default BillStepper;
