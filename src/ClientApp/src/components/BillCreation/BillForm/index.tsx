import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';

import InputField from 'components/InputForm/InputFields';
import { DateSelector } from 'components/InputForm/DateSelector';
import { UserSelector } from 'components/InputForm/UserSelector';
import { ItemSelector } from 'components/InputForm/ItemSelector';
import { PriceDisplay } from '../PriceDisplay';
import BillFormProps, { Steps } from './props';

export const BillForm = (props: BillFormProps) => {
  const { title, inputs, fields, set, submit, cancel } = props;

  const steps: Steps[] = fields.map((f, idx) => {
    switch (f.type) {
      case 'date':
        return {
          label: 'Choose the timeframe',
          element: <DateSelector start={f.dates.start} end={f.dates.end} set={set} />
        };
      case 'span':
        return {
          label: '',
          element: (
            <Alert key={`alert-${idx}`} severity="info">
              {f.content}
            </Alert>
          )
        };
      case 'users':
        return {
          label: 'Invite some users',
          element: (
            <UserSelector
              name={f.name}
              label={f.label}
              users={inputs['users']}
              setUsers={set('users')}
              err={f.err}
            />
          )
        };
      case 'items':
        return {
          label: '',
          element: (
            <ItemSelector
              name={f.name}
              label={f.label}
              items={inputs['items']}
              setItems={set('items')}
              err={f.err}
            />
          )
        };
      case 'price':
        return {
          label: '',
          element: <PriceDisplay price={inputs.price} set={set('price')} disabled={f.disabled} />
        };
      default:
        return {
          label: '',
          element: (
            <InputField
              name={f.name}
              label={f.label}
              type={f.type}
              inputs={inputs[f.name]}
              set={set(f.name)}
              err={f.err}
            />
          )
        };
    }
  });

  console.log(steps);

  const [activeStep, setActiveStep] = React.useState(0);

  const handle_next = () => setActiveStep((prev) => prev + 1);

  const handle_back = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel>{step.label} 123</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {steps[activeStep].element}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep === 0 ? (
            <Link to={cancel.href} style={{ textDecoration: 'none' }}>
              <Button>Cancel</Button>
            </Link>
          ) : (
            <Button onClick={handle_back} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Link to={submit.href} onClick={submit?.func} style={{ textDecoration: 'none' }}>
              <Button>Submit</Button>
            </Link>
          ) : (
            <Button onClick={handle_next}>Next</Button>
          )}
        </Box>
      </>
    </Box>
  );
}; // based on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

{/* <LockOutlinedIcon /> */}
